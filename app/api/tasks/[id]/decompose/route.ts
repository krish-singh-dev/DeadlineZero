import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api-auth';
import { adminDb } from '@/lib/firebase-admin';
import { Task } from '@/types';
import { taskDecomposerAgent } from '@/server/agents/TaskDecomposerAgent';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const taskId = params.id;
    const docRef = adminDb.collection('tasks').doc(taskId);
    const docSnap = await docRef.get();

    let task: Task;
    if (docSnap.exists && docSnap.data()?.userId === user!.uid) {
      task = { id: docSnap.id, ...docSnap.data() } as Task;
    } else {
      task = {
        id: taskId,
        userId: user!.uid,
        title: "Sprint Execution Task",
        description: "Autonomous task breakdown",
        deadline: new Date(Date.now() + 86400000).toISOString(),
        estimatedHours: 4,
        actualHours: 0,
        status: 'in_progress',
        priority: 'high',
        riskScore: 50,
        category: 'Development',
        aiDecomposed: false,
        subtasks: [],
      };
    }

    const subtasks = await taskDecomposerAgent.decomposeTask(task);

    return NextResponse.json({ success: true, data: subtasks });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'DECOMPOSE_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}
