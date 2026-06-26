import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminDb } from '../../lib/firebase-admin';
import { chatActionAgent } from '../agents/ChatActionAgent';
import { ChatMessage, ChatSession } from '../../types';
import crypto from 'crypto';

const router = Router();
router.use(authenticateToken);

/**
 * POST /api/chat
 * Multi-turn conversational co-pilot endpoint.
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, sessionId } = req.body;
    if (!message) {
      res.status(400).json({ success: false, error: { code: 'MISSING_MESSAGE', message: 'Message text required', statusCode: 400 } });
      return;
    }

    const userId = req.user!.uid;
    const currentSessionId = sessionId || crypto.randomUUID();
    const sessionRef = adminDb.collection('chatSessions').doc(currentSessionId);
    const sessionSnap = await sessionRef.get();

    let history: ChatMessage[] = [];
    if (sessionSnap.exists) {
      history = (sessionSnap.data()?.messages || []) as ChatMessage[];
    } else {
      const newSession: ChatSession = { id: currentSessionId, userId, startedAt: new Date().toISOString(), messages: [] };
      await sessionRef.set(newSession);
    }

    // Process turn with conversational co-pilot agent
    const turnResult = await chatActionAgent.processChatTurn(req.user!, history, message);

    const userMsgObj: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: message, timestamp: new Date().toISOString() };
    const assistantMsgObj: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: turnResult.reply,
      timestamp: new Date().toISOString(),
      taskCards: turnResult.mutatedTasks,
    };

    const updatedMessages = [...history, userMsgObj, assistantMsgObj];
    await sessionRef.update({ messages: updatedMessages });

    res.status(200).json({
      success: true,
      data: {
        sessionId: currentSessionId,
        message: assistantMsgObj,
        actionTaken: turnResult.actionTaken,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'CHAT_ERROR', message: error.message, statusCode: 500 } });
  }
});

export default router;
