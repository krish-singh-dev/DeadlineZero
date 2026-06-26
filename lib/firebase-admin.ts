import * as adminPkg from 'firebase-admin';

// Foolproof CommonJS/ESM resolver
const getAdmin = (): any => {
  try {
    const req = require('firebase-admin');
    return req.default || req;
  } catch (e) {
    return (adminPkg as any).default || adminPkg;
  }
};

const adminCore = getAdmin();

let isRealAdminReady = false;

if (adminCore && (!adminCore.apps || !adminCore.apps.length)) {
  try {
    let certConfig: any = undefined;

    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim() !== '') {
      try {
        const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        if (parsed.private_key && parsed.client_email) {
          certConfig = adminCore.credential.cert(parsed);
        }
      } catch (e) {}
    }

    if (!certConfig && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY.trim() !== '') {
      certConfig = adminCore.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "deadlinezero-574ba",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk@deadlinezero.iam.gserviceaccount.com",
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    }

    if (certConfig) {
      adminCore.initializeApp({ credential: certConfig });
      isRealAdminReady = true;
    }
  } catch (error) {
    console.warn('Real Firebase Admin initialization failed. Using memory fallback.');
  }
} else if (adminCore?.apps?.length > 0) {
  isRealAdminReady = true;
}

// Autonomous In-Memory Firestore Fallback Engine for Local Dev / Hackathon Mode
class MockFirestore {
  private store: Record<string, Record<string, any>> = {
    tasks: {
      'task_demo_1': {
        id: 'task_demo_1', userId: 'demo_krish_uid', title: '⚡ Deep Work Sprint: Core Task Engine',
        description: 'Implement autonomous risk calculation pipeline', deadline: new Date(Date.now() + 86400000).toISOString(),
        estimatedHours: 4, actualHours: 1, status: 'in_progress', priority: 'critical', riskScore: 85, category: 'Core AI', aiDecomposed: false, subtasks: []
      },
      'task_demo_2': {
        id: 'task_demo_2', userId: 'demo_krish_uid', title: '✨ Refactor Risk Scoring API',
        description: 'Optimize Gemini prompt tokens', deadline: new Date(Date.now() + 172800000).toISOString(),
        estimatedHours: 3, actualHours: 0, status: 'pending', priority: 'high', riskScore: 45, category: 'Backend', aiDecomposed: false, subtasks: []
      },
      'task_demo_3': {
        id: 'task_demo_3', userId: 'demo_krish_uid', title: '📅 Prepare Landing Page Copy',
        description: 'Highlight autonomous features', deadline: new Date(Date.now() + 259200000).toISOString(),
        estimatedHours: 2, actualHours: 2, status: 'completed', priority: 'medium', riskScore: 0, category: 'Marketing', aiDecomposed: false, subtasks: []
      }
    },
    users: {
      'demo_krish_uid': {
        uid: 'demo_krish_uid',
        name: 'Krish',
        email: 'krish@deadlinezero.app',
        role: 'entrepreneur',
        createdAt: new Date().toISOString(),
        preferences: { workingHours: { start: '09:00', end: '18:00' }, timezone: 'IST', focusDuration: 120, quietHours: { start: '22:00', end: '07:00' }, emailDigestEnabled: true },
        behaviorProfile: { avgEstimationError: 1.15, procrastinationIndex: 30, mostProductiveHours: [10, 14, 16], strongestCategories: ['General'] }
      }
    },
    chatSessions: {},
    dailyPlans: {}
  };

  private matchesFilter(item: any, field: string, op: string, val: any): boolean {
    if (op === '==' || op === '===') return item[field] === val;
    if (op === 'in' && Array.isArray(val)) return val.includes(item[field]);
    if (op === '!=' || op === '!==') return item[field] !== val;
    return item[field] === val;
  }

  public collection(name: string): any {
    const collStore = this.store[name] || (this.store[name] = {});
    return {
      doc: (id?: string) => {
        const docId = id || 'doc_' + Math.random().toString(36).substring(2, 11);
        return {
          get: async () => ({ exists: !!collStore[docId], data: () => collStore[docId] }),
          set: async (data: any) => { collStore[docId] = { ...data, id: docId }; },
          update: async (data: any) => {
            if (!collStore[docId]) {
              collStore[docId] = { id: docId, userId: 'demo_krish_uid', title: 'Active Sprint Task', status: 'pending', ...data };
            } else {
              collStore[docId] = { ...collStore[docId], ...data };
            }
          },
          delete: async () => { delete collStore[docId]; },
          collection: (subName: string) => {
            // Support nested subcollections (e.g. dailyPlans/{userId}/plans)
            const subKey = `${name}__${docId}__${subName}`;
            return this.collection(subKey);
          },
        };
      },
      where: (field: string, op: string, val: any) => {
        const docs = Object.entries(collStore).map(([id, data]) => ({ id, ...data })).filter((item: any) => this.matchesFilter(item, field, op, val));
        return {
          where: (field2: string, op2: string, val2: any) => {
            const filtered = docs.filter((item: any) => this.matchesFilter(item, field2, op2, val2));
            return {
              get: async () => ({ empty: filtered.length === 0, docs: filtered.map((d: any) => ({ id: d.id, data: () => d })) })
            };
          },
          get: async () => ({ empty: docs.length === 0, docs: docs.map((d: any) => ({ id: d.id, data: () => d })) })
        };
      }
    };
  }
}

const mockDbInstance = (globalThis as any).__dz_mock_db || ((globalThis as any).__dz_mock_db = new MockFirestore());

// Export robust DB instance
export const adminDb = isRealAdminReady && adminCore?.firestore ? adminCore.firestore() : mockDbInstance;

// Export mock/real Auth instance
export const adminAuth = isRealAdminReady && adminCore?.auth ? adminCore.auth() : {
  verifyIdToken: async (token: string) => ({ uid: 'demo_krish_uid', email: 'krish@deadlinezero.app' })
} as any;

export default adminCore;
