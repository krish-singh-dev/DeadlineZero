import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminDb } from '../../lib/firebase-admin';
import { behaviorLearnerAgent } from '../agents/BehaviorLearnerAgent';
import { Task } from '../../types';

const router = Router();
router.use(authenticateToken);

/**
 * GET /api/analytics
 * Retrieve real-time user velocity telemetry and trigger background drift recalibration.
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.uid;

    // Asynchronously trigger behavior learner agent (Rule 6 AI action)
    const learnedProfilePromise = behaviorLearnerAgent.learnUserBehavior(userId);

    // Fetch all user tasks to calculate burn-down telemetry
    const tasksSnap = await adminDb.collection('tasks').where('userId', '==', userId).get();
    const tasks: Task[] = tasksSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Task));

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
    const criticalRisks = tasks.filter(t => t.status !== 'completed' && t.riskScore >= 61).length;

    // Category distribution
    const categoryCounts: Record<string, number> = {};
    for (const t of tasks) {
      const cat = t.category || 'General';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }

    const learnedProfile = await learnedProfilePromise;

    res.status(200).json({
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'ANALYTICS_ERROR', message: error.message, statusCode: 500 } });
  }
});

export default router;
