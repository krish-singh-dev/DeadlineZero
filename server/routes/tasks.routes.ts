import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminDb } from '../../lib/firebase-admin';
import { Task, ApiResponse } from '../../types';
import { riskAnalyzerAgent } from '../agents/RiskAnalyzerAgent';
import { taskDecomposerAgent } from '../agents/TaskDecomposerAgent';
import { z } from 'zod';
import crypto from 'crypto';

const router = Router();

// Apply zero-trust Bearer authentication across all task endpoints
router.use(authenticateToken);

// Zod Validation Schema (Rule 24 Security)
const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(1000).optional().default(""),
  deadline: z.string().datetime("Must be a valid ISO datetime"),
  estimatedHours: z.number().min(0.25).max(500),
  priority: z.enum(['critical', 'high', 'medium', 'low']).default('medium'),
  category: z.string().max(50).default('General'),
  goalId: z.string().nullable().optional(),
});

/**
 * GET /api/tasks
 * Fetch all tasks isolated to authenticated user.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.uid;
    const snapshot = await adminDb.collection('tasks').where('userId', '==', userId).get();
    
    const tasks: Task[] = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Task));
    
    res.status(200).json({ success: true, data: tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'FETCH_TASKS_ERROR', message: error.message, statusCode: 500 } });
  }
});

/**
 * POST /api/tasks
 * Create task and trigger autonomous Gemini Urgency Scorer agent.
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = createTaskSchema.parse(req.body);
    const userId = req.user!.uid;
    const taskId = crypto.randomUUID();

    const newTask: Task = {
      id: taskId,
      userId,
      title: validated.title,
      description: validated.description,
      deadline: validated.deadline,
      estimatedHours: validated.estimatedHours,
      actualHours: 0,
      status: 'pending',
      priority: validated.priority,
      riskScore: 50, // Initial default score
      category: validated.category,
      goalId: validated.goalId || null,
      aiDecomposed: false,
      subtasks: [],
    };

    await adminDb.collection('tasks').doc(taskId).set(newTask);

    // Concurrently invoke autonomous Risk Analyzer agent (Rule 6 AI Action)
    if (req.user?.behaviorProfile) {
      riskAnalyzerAgent.analyzeTaskRisk(newTask, req.user.behaviorProfile).catch(err => {
        console.error('Background risk scoring failed:', err);
      });
    }

    const response: ApiResponse<Task> = { success: true, data: newTask };
    res.status(201).json(response);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const msg = (error as any).issues?.[0]?.message || (error as any).errors?.[0]?.message || "Validation error";
      res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: msg, statusCode: 400 } });
      return;
    }
    res.status(500).json({ success: false, error: { code: 'CREATE_TASK_ERROR', message: error.message, statusCode: 500 } });
  }
});

/**
 * POST /api/tasks/:id/decompose
 * Trigger autonomous Task Decomposer agent (Rule 6).
 */
router.post('/:id/decompose', async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const docRef = adminDb.collection('tasks').doc(taskId);
    const docSnap = await docRef.get();

    if (!docSnap.exists || docSnap.data()?.userId !== req.user!.uid) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found', statusCode: 404 } });
      return;
    }

    const task = { id: docSnap.id, ...docSnap.data() } as Task;
    const subtasks = await taskDecomposerAgent.decomposeTask(task);

    res.status(200).json({ success: true, data: subtasks });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'DECOMPOSE_ERROR', message: error.message, statusCode: 500 } });
  }
});

/**
 * PATCH /api/tasks/:id
 * Update task status or hours. Re-evaluates risk score if workload shifts.
 */
router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const docRef = adminDb.collection('tasks').doc(taskId);
    const docSnap = await docRef.get();

    if (!docSnap.exists || docSnap.data()?.userId !== req.user!.uid) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found', statusCode: 404 } });
      return;
    }

    const currentTask = { id: docSnap.id, ...docSnap.data() } as Task;
    const updates = req.body;

    await docRef.update({ ...updates, updatedAt: new Date().toISOString() });
    const updatedTask = { ...currentTask, ...updates };

    // Re-trigger risk analyzer if deadline or hours mutated
    if ((updates.estimatedHours || updates.actualHours || updates.deadline) && req.user?.behaviorProfile) {
      riskAnalyzerAgent.analyzeTaskRisk(updatedTask, req.user.behaviorProfile).catch(() => {});
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'UPDATE_ERROR', message: error.message, statusCode: 500 } });
  }
});

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const docRef = adminDb.collection('tasks').doc(taskId);
    const docSnap = await docRef.get();

    if (!docSnap.exists || docSnap.data()?.userId !== req.user!.uid) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found', statusCode: 404 } });
      return;
    }

    await docRef.delete();
    res.status(200).json({ success: true, data: { deletedId: taskId } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'DELETE_ERROR', message: error.message, statusCode: 500 } });
  }
});

export default router;
