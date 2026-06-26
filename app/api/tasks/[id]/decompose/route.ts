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

    if (!docSnap.exists || docSnap.data()?.userId !== user!.uid) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found', statusCode: 404 } }, { status: 404 });
    }

    const task = { id: docSnap.id, ...docSnap.data() } as Task;
    const subtasks = await taskDecomposerAgent.decomposeTask(task);

    return NextResponse.json({ success: true, data: subtasks });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'DECOMPOSE_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}
