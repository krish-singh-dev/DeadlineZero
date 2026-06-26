import { GoogleGenerativeAI } from '@google/generative-ai';
import { adminDb } from '../../lib/firebase-admin';
import { Task, UserBehaviorProfile } from '../../types';
import { differenceInHours } from 'date-fns';

const apiKey = process.env.GEMINI_API_KEY || "demo_key";
const genAI = new GoogleGenerativeAI(apiKey);

export interface RiskAnalysisResult {
  riskScore: number; // 0-100
  rationale: string;
  suggestedAction: string;
}

export class RiskAnalyzerAgent {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  /**
   * Evaluates the risk score for a task autonomously using Gemini 1.5 Flash.
   * Cites Rule 9 color tiers: 0-30 Green, 31-60 Yellow, 61-85 Orange, 86-100 Red.
   */
  public async analyzeTaskRisk(
    task: Task,
    behaviorProfile: UserBehaviorProfile
  ): Promise<RiskAnalysisResult> {
    const hoursUntilDeadline = Math.max(0.1, differenceInHours(new Date(task.deadline), new Date()));
    const hoursRemaining = Math.max(0, task.estimatedHours - task.actualHours);

    const systemPrompt = `
You are DeadlineZero's autonomous Risk Analyzer Agent. Your job is to calculate a dynamic urgency score (0-100) for a user's task.

### TASK PARAMETERS:
- Title: "${task.title}"
- Priority: ${task.priority}
- Estimated Hours Needed: ${hoursRemaining}h remaining
- Hours Until Deadline: ${hoursUntilDeadline}h

### USER BEHAVIOR PROFILE:
- Average Estimation Error: ${behaviorProfile.avgEstimationError}x (user tends to underestimate workload)
- Procrastination Index: ${behaviorProfile.procrastinationIndex}/100

### SCORING SYSTEM (Rule 9):
- 0-30 (Low/Green): Plenty of buffer time.
- 31-60 (Medium/Yellow): Moderate pressure. Needs steady attention.
- 61-85 (High/Orange): Tight buffer. High chance of slippage without immediate focus.
- 86-100 (Critical/Red): Deadline emergency. Mathematically impossible without overtime or immediate intervention.

Respond STRICTLY in valid JSON format matching this schema:
{
  "riskScore": number (integer between 0 and 100),
  "rationale": string (1 concise sentence explaining the score),
  "suggestedAction": string (actionable advice, e.g. "Pre-block 2h tomorrow morning")
}
`;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });

      const responseText = result.response.text();
      const parsed: RiskAnalysisResult = JSON.parse(responseText);

      // Clamp score to 0-100 range
      const clampedScore = Math.min(100, Math.max(0, Math.round(parsed.riskScore)));

      // Persist autonomous calculation to Firestore
      await adminDb.collection('tasks').doc(task.id).update({
        riskScore: clampedScore,
        riskRationale: parsed.rationale,
        updatedAt: new Date().toISOString(),
      });

      return {
        riskScore: clampedScore,
        rationale: parsed.rationale,
        suggestedAction: parsed.suggestedAction,
      };
    } catch (error: any) {
      console.error('Gemini Risk Analysis Failure. Executing deterministic heuristic fallback:', error.message);

      // Deterministic heuristic formula fallback (Velocity vs Pressure math)
      const adjustedHoursNeeded = hoursRemaining * behaviorProfile.avgEstimationError;
      const pressureRatio = adjustedHoursNeeded / hoursUntilDeadline;
      let fallbackScore = Math.round(pressureRatio * 55 + behaviorProfile.procrastinationIndex * 0.35);

      if (hoursUntilDeadline <= 4 && hoursRemaining > 2) fallbackScore += 30;
      const clampedFallback = Math.min(100, Math.max(5, fallbackScore));

      const fallbackRationale = `Calculated deterministically based on ${hoursRemaining}h work remaining over ${Math.round(hoursUntilDeadline)}h buffer window.`;

      await adminDb.collection('tasks').doc(task.id).update({
        riskScore: clampedFallback,
        riskRationale: fallbackRationale,
        updatedAt: new Date().toISOString(),
      });

      return {
        riskScore: clampedFallback,
        rationale: fallbackRationale,
        suggestedAction: 'Schedule an immediate focus block.',
      };
    }
  }

  /**
   * Batch evaluates all pending tasks for a user (called by background cron).
   */
  public async batchAnalyzeUserTasks(userId: string): Promise<number> {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) return 0;

    const behaviorProfile = userDoc.data()?.behaviorProfile as UserBehaviorProfile;
    const tasksSnapshot = await adminDb
      .collection('tasks')
      .where('userId', '==', userId)
      .where('status', 'in', ['pending', 'in_progress'])
      .get();

    let updatedCount = 0;
    for (const docSnap of tasksSnapshot.docs) {
      const task = { id: docSnap.id, ...docSnap.data() } as Task;
      await this.analyzeTaskRisk(task, behaviorProfile);
      updatedCount++;
    }

    return updatedCount;
  }
}

export const riskAnalyzerAgent = new RiskAnalyzerAgent();
