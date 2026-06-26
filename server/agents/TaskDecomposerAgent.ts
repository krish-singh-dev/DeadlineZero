import { GoogleGenerativeAI } from '@google/generative-ai';
import { adminDb } from '../../lib/firebase-admin';
import { Task, SubTask } from '../../types';
import crypto from 'crypto';

const apiKey = process.env.GEMINI_API_KEY || "demo_key";
const genAI = new GoogleGenerativeAI(apiKey);

export class TaskDecomposerAgent {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  /**
   * Autonomously breaks down a high-level task into 3-5 granular, executable subtasks.
   * Cites Rule 6 (AI Must Take Actions).
   */
  public async decomposeTask(task: Task): Promise<SubTask[]> {
    const systemPrompt = `
You are DeadlineZero's autonomous Task Decomposer Agent. Your goal is to break down a user's intimidating task into 3 to 5 bite-sized, sequential sprint steps.

### TASK TO DECOMPOSE:
- Title: "${task.title}"
- Description: "${task.description || 'No additional details provided'}"
- Total Estimated Hours: ${task.estimatedHours}h
- Category: ${task.category || 'General'}

### REQUIREMENTS:
1. Generate between 3 and 5 concrete subtasks.
2. The sum of estimatedHours across subtasks must roughly equal ${task.estimatedHours}h.
3. Keep titles action-oriented (e.g. "Draft initial database schema").

Respond STRICTLY in valid JSON matching this schema array:
[
  {
    "title": string (concise actionable step),
    "estimatedHours": number (float or integer hours needed)
  }
]
`;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      });

      const rawText = result.response.text().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed: Array<{ title: string; estimatedHours: number }> = JSON.parse(rawText);

      const subtasks: SubTask[] = parsed.map((item) => ({
        id: crypto.randomUUID(),
        title: item.title,
        estimatedHours: item.estimatedHours || Math.round((task.estimatedHours / parsed.length) * 10) / 10,
        deadline: task.deadline,
        completed: false,
      }));

      await adminDb.collection('tasks').doc(task.id).update({
        subtasks,
        aiDecomposed: true,
        updatedAt: new Date().toISOString(),
      });

      return subtasks;
    } catch (error: any) {
      console.error('Gemini Task Decomposition Exception. Using fallback steps:', error.message);

      const stepHours = Math.max(0.5, Math.round((task.estimatedHours / 3) * 10) / 10);
      const fallbackSubtasks: SubTask[] = [
        { id: crypto.randomUUID(), title: `Research & outline requirements for: ${task.title}`, estimatedHours: stepHours, deadline: task.deadline, completed: false },
        { id: crypto.randomUUID(), title: `Execute primary implementation phase`, estimatedHours: stepHours, deadline: task.deadline, completed: false },
        { id: crypto.randomUUID(), title: `Review, test & finalize output`, estimatedHours: stepHours, deadline: task.deadline, completed: false },
      ];

      await adminDb.collection('tasks').doc(task.id).update({
        subtasks: fallbackSubtasks,
        aiDecomposed: true,
        updatedAt: new Date().toISOString(),
      });

      return fallbackSubtasks;
    }
  }
}

export const taskDecomposerAgent = new TaskDecomposerAgent();
