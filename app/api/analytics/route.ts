import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api-auth';
import { adminDb } from '@/lib/firebase-admin';
import { behaviorLearnerAgent } from '@/server/agents/BehaviorLearnerAgent';
import { Task } from '@/types';

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const userId = user!.uid;
    const learnedProfilePromise = behaviorLearnerAgent.learnUserBehavior(userId);

    const tasksSnap = await adminDb.collection('tasks').where('userId', '==', userId).get();
    const tasks: Task[] = tasksSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Task));

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
    const criticalRisks = tasks.filter(t => t.status !== 'completed' && t.riskScore >= 61).length;

    const categoryCounts: Record<string, number> = {};
    for (const t of tasks) {
      const cat = t.category || 'General';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }

    const learnedProfile = await learnedProfilePromise;

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          totalTasks,
          completedTasks,
          pendingTasks,
          criticalRisks,
          completionRatePercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        },
        behaviorProfile: learnedProfile,
        categoryDistribution: categoryCounts,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'ANALYTICS_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}
