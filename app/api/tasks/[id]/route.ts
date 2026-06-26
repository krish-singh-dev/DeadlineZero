import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api-auth';
import { adminDb } from '@/lib/firebase-admin';
import { Task } from '@/types';
import { riskAnalyzerAgent } from '@/server/agents/RiskAnalyzerAgent';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const taskId = params.id;
    const docRef = adminDb.collection('tasks').doc(taskId);
    const docSnap = await docRef.get();

    if (!docSnap.exists || docSnap.data()?.userId !== user!.uid) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found', statusCode: 404 } }, { status: 404 });
    }

    const currentTask = { id: docSnap.id, ...docSnap.data() } as Task;
    const updates = await req.json();

    await docRef.update({ ...updates, updatedAt: new Date().toISOString() });
    const updatedTask = { ...currentTask, ...updates };

    if ((updates.estimatedHours || updates.actualHours || updates.deadline) && user?.behaviorProfile) {
      riskAnalyzerAgent.analyzeTaskRisk(updatedTask, user.behaviorProfile).catch(() => {});
    }

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'UPDATE_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const taskId = params.id;
    const docRef = adminDb.collection('tasks').doc(taskId);
    const docSnap = await docRef.get();

    if (!docSnap.exists || docSnap.data()?.userId !== user!.uid) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found', statusCode: 404 } }, { status: 404 });
    }

    await docRef.delete();
    return NextResponse.json({ success: true, data: { deletedId: taskId } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'DELETE_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}
