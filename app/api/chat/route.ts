import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api-auth';
import { adminDb } from '@/lib/firebase-admin';
import { chatActionAgent } from '@/server/agents/ChatActionAgent';
import { ChatMessage, ChatSession } from '@/types';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  try {
    const { message, sessionId } = await req.json();
    if (!message) {
      return NextResponse.json({ success: false, error: { code: 'MISSING_MESSAGE', message: 'Message text required', statusCode: 400 } }, { status: 400 });
    }

    const userId = user!.uid;
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

    const turnResult = await chatActionAgent.processChatTurn(user!, history, message);

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

    return NextResponse.json({
      success: true,
      data: {
        sessionId: currentSessionId,
        message: assistantMsgObj,
        actionTaken: turnResult.actionTaken,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'CHAT_ERROR', message: err.message, statusCode: 500 } }, { status: 500 });
  }
}
