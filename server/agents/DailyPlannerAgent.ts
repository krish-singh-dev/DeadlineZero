import { GoogleGenerativeAI } from '@google/generative-ai';
import { adminDb } from '../../lib/firebase-admin';
import { Task, DailyPlan, TimeBlock, UserProfile } from '../../types';
import { format } from 'date-fns';

const apiKey = process.env.GEMINI_API_KEY || "demo_key";
const genAI = new GoogleGenerativeAI(apiKey);

export class DailyPlannerAgent {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  /**
   * Autonomously generates a cohesive morning action plan for the user.
   * Cites Rule 12 (Daily AI Plan Card Differentiator) & Rule 6 (AI Action).
   */
  public async generateMorningPlan(userId: string): Promise<DailyPlan> {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) throw new Error('User not found');

    const profile = userDoc.data() as UserProfile;
    const tasksSnapshot = await adminDb
      .collection('tasks')
      .where('userId', '==', userId)
      .where('status', 'in', ['pending', 'in_progress'])
      .get();

    const tasks: Task[] = tasksSnapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as Task));
    tasks.sort((a, b) => b.riskScore - a.riskScore);

    const urgentTasks = tasks.slice(0, 5); // Focus on top 5 risk bottlenecks
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    const systemPrompt = `
You are DeadlineZero's autonomous Daily Planner Agent. Synthesize a morning briefing and recommended focus blocks for today (${todayStr}).

### USER CONTEXT:
- Name: ${profile.name} (${profile.role} Persona)
- Working Hours: ${profile.preferences.workingHours.start} to ${profile.preferences.workingHours.end}
- Focus Sprint Length: ${profile.preferences.focusDuration} minutes
- Most Productive Hours: ${profile.behaviorProfile.mostProductiveHours.join(', ')}:00

### TOP BOTTLENECK TASKS:
${urgentTasks.map(t => `- [Risk ${t.riskScore}] "${t.title}" (${t.estimatedHours - t.actualHours}h left, due ${t.deadline})`).join('\n')}

Respond STRICTLY in JSON matching this schema:
{
  "aiSummary": string (2 warm, motivational sentences recommending exact priorities),
  "scheduledBlocks": [
    {
      "title": string (e.g. "Deep Work: [Task Title]"),
      "start": string (ISO timestamp today inside working hours),
      "end": string (ISO timestamp today),
      "taskId": string (ID of the task being tackled)
    }
  ]
}
`;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      });

      const parsed: { aiSummary: string; scheduledBlocks: TimeBlock[] } = JSON.parse(result.response.text());

      const plan: DailyPlan = {
        generatedAt: new Date().toISOString(),
        aiSummary: parsed.aiSummary,
        scheduledBlocks: parsed.scheduledBlocks || [],
      };

      // Autonomously store morning plan in Firestore
      await adminDb
        .collection('dailyPlans')
        .doc(userId)
        .collection('plans')
        .doc(todayStr)
        .set(plan);

      return plan;
    } catch (error: any) {
      console.error('Daily Planner AI Exception. Generating heuristic schedule:', error.message);

      const now = new Date();
      now.setHours(9, 0, 0, 0);
      const endBlock = new Date(now.getTime() + profile.preferences.focusDuration * 60000);

      const fallbackBlock: TimeBlock = urgentTasks[0]
        ? { title: `Sprint Focus: ${urgentTasks[0].title}`, start: now.toISOString(), end: endBlock.toISOString(), taskId: urgentTasks[0].id }
        : { title: 'General Sprint Block', start: now.toISOString(), end: endBlock.toISOString() };

      const fallbackPlan: DailyPlan = {
        generatedAt: new Date().toISOString(),
        aiSummary: `Good morning, ${profile.name}! Gemini recommends dedicating your peak morning energy to your highest risk pending items.`,
        scheduledBlocks: [fallbackBlock],
      };

      await adminDb
        .collection('dailyPlans')
        .doc(userId)
        .collection('plans')
        .doc(todayStr)
        .set(fallbackPlan);

      return fallbackPlan;
    }
  }
}

export const dailyPlannerAgent = new DailyPlannerAgent();
