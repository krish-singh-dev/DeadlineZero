import { adminDb } from '../../lib/firebase-admin';
import { Task, UserBehaviorProfile } from '../../types';
import { differenceInHours } from 'date-fns';

export class BehaviorLearnerAgent {
  /**
   * Autonomously evaluates completed telemetry to calibrate user estimation drift factor.
   * Cites Rule 6 (AI Action) & Rule 9 (Dynamic Risk Telemetry Input).
   */
  public async learnUserBehavior(userId: string): Promise<UserBehaviorProfile> {
    const completedSnap = await adminDb
      .collection('tasks')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .get();

    if (completedSnap.empty) {
      // Default baseline profile if zero historical telemetry
      return {
        avgEstimationError: 1.25,
        procrastinationIndex: 35,
        mostProductiveHours: [10, 14, 16],
        strongestCategories: ['General'],
      };
    }

    const tasks: Task[] = completedSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Task));

    let totalEst = 0;
    let totalAct = 0;
    let lateCount = 0;
    const hourHistogram: Record<number, number> = {};

    for (const t of tasks) {
      if (t.estimatedHours > 0 && (t.actualHours || t.estimatedHours) > 0) {
        totalEst += t.estimatedHours;
        totalAct += t.actualHours || t.estimatedHours;
      }

      // Check if finished past or within 1 hour of deadline
      if (t.updatedAt && t.deadline) {
        const finishTime = new Date(t.updatedAt);
        const deadlineTime = new Date(t.deadline);
        if (differenceInHours(finishTime, deadlineTime) >= 0) {
          lateCount++;
        }

        const finishHour = finishTime.getHours();
        hourHistogram[finishHour] = (hourHistogram[finishHour] || 0) + 1;
      }
    }

    // Calculate velocity estimation factor
    const rawError = totalEst > 0 ? totalAct / totalEst : 1.25;
    const clampedError = Math.round(Math.min(3.0, Math.max(0.6, rawError)) * 100) / 100;

    // Calculate procrastination score (0-100)
    const lateRatio = tasks.length > 0 ? lateCount / tasks.length : 0.3;
    const procrastinationScore = Math.min(100, Math.round(lateRatio * 85 + 15));

    // Top 3 peak completion hours
    const sortedHours = Object.entries(hourHistogram)
      .sort(([, a], [, b]) => b - a)
      .map(([h]) => Number(h));
    const productiveHours = sortedHours.length > 0 ? sortedHours.slice(0, 3) : [10, 14, 16];

    const updatedProfile: UserBehaviorProfile = {
      avgEstimationError: clampedError,
      procrastinationIndex: procrastinationScore,
      mostProductiveHours: productiveHours,
      strongestCategories: [],
    };

    // Autonomously persist learned profile back to Firestore user document
    await adminDb.collection('users').doc(userId).update({
      behaviorProfile: updatedProfile,
      updatedAt: new Date().toISOString(),
    });

    return updatedProfile;
  }
}

export const behaviorLearnerAgent = new BehaviorLearnerAgent();
