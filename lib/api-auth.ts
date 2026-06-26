import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from './firebase-admin';
import { UserProfile } from '../types';

export async function getAuthUser(req: NextRequest): Promise<{ user?: UserProfile; error?: NextResponse }> {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED_MISSING_TOKEN', message: 'Access denied. Missing token.', statusCode: 401 } },
        { status: 401 }
      ),
    };
  }

  const idToken = authHeader.split(' ')[1];

  // Instant Demo Mode Bypass
  if (idToken === 'demo_token' || idToken === 'undefined' || idToken === 'null' || idToken === 'demo_krish_token') {
    return {
      user: {
        uid: 'demo_krish_uid',
        name: 'Krish',
        email: 'krish@deadlinezero.app',
        role: 'entrepreneur',
        createdAt: new Date().toISOString(),
        preferences: { workingHours: { start: '09:00', end: '18:00' }, timezone: 'IST', focusDuration: 120, quietHours: { start: '22:00', end: '07:00' }, emailDigestEnabled: true },
        behaviorProfile: { mostProductiveHours: [10, 14, 16], avgEstimationError: 1.25, procrastinationIndex: 35, strongestCategories: ['Core AI'] },
      },
    };
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      return {
        error: NextResponse.json(
          { success: false, error: { code: 'FORBIDDEN_USER_NOT_ONBOARDED', message: 'User profile not found.', statusCode: 403 } },
          { status: 403 }
        ),
      };
    }

    return { user: userDoc.data() as UserProfile };
  } catch (err: any) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED_INVALID_TOKEN', message: 'Invalid token.', statusCode: 401 } },
        { status: 401 }
      ),
    };
  }
}
