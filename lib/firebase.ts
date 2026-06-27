import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBNVI3SCGSokjXG1iFVXcy6D6fCUUsZrWA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "deadlinezero-574ba.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "deadlinezero-574ba",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "deadlinezero-574ba.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "836548916075",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:836548916075:web:3ae62b67b3bc12bbcf522e",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-T9BBWT432G"
};

// Initialize Firebase client SDK (singleton pattern for Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Request offline access so we receive Google Calendar access + refresh tokens (Commented out to bypass sensitive scope warning during Hackathon demo)
// googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');
// googleProvider.setCustomParameters({
//   access_type: 'offline',
//   prompt: 'consent'
// });

export default app;
