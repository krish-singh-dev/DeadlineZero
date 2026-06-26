import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api-auth';
import { adminDb } from '@/lib/firebase-admin';
import { Task, ApiResponse } from '@/types';
import { riskAnalyzerAgent } from '@/server/agents/RiskAnalyzerAgent';
import { z } from 'zod';
import crypto from 'crypto';

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(1000).optional().default(""),
  deadline: z.string().datetime("Must be a valid ISO datetime"),
  estimatedHours: z.number().min(0.25).max(500),
  priority: z.enum(['critical', 'high', 'medium', 'low']).default('medium'),
  category: z.string().max(50).default('General'),
  goalId: z.string().nullable().optional(),
});

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const snapshot = await adminDb.collection('tasks').where('userId', '==', user!.uid).get();
    const tasks: Task[] = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Task));
    return NextResponse.json({ success: true, data: tasks });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'FETCH_TASKS_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const body = await req.json();
    const validated = createTaskSchema.parse(body);
    const taskId = crypto.randomUUID();

    const newTask: Task = {
      id: taskId,
      userId: user!.uid,
      title: validated.title,
      description: validated.description,
      deadline: validated.deadline,
      estimatedHours: validated.estimatedHours,
      actualHours: 0,
      status: 'pending',
      priority: validated.priority,
      riskScore: 50,
      category: validated.category,
      goalId: validated.goalId || null,
      aiDecomposed: false,
      subtasks: [],
    };

    await adminDb.collection('tasks').doc(taskId).set(newTask);

    if (user?.behaviorProfile) {
      riskAnalyzerAgent.analyzeTaskRisk(newTask, user.behaviorProfile).catch(err => {
        console.error('Background risk scoring failed:', err);
      });
    }

    const response: ApiResponse<Task> = { success: true, data: newTask };
    return NextResponse.json(response, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const msg = (err as any).issues?.[0]?.message || (err as any).errors?.[0]?.message || "Validation error";
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: msg, statusCode: 400 } }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: { code: 'CREATE_TASK_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}
