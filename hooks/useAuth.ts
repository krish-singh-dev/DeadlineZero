'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { UserProfile, UserRole, UserPreferences } from '@/types';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  needsOnboarding: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setNeedsOnboarding: (needs: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  loading: true,
  needsOnboarding: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setNeedsOnboarding: (needs) => set({ needsOnboarding: needs }),
}));

export function useAuth() {
  const {
    user,
    profile,
    loading,
    needsOnboarding,
    setUser,
    setProfile,
    setLoading,
    setNeedsOnboarding,
  } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Preserve hackathon instant demo session if active
      if (!firebaseUser && useAuthStore.getState().user?.uid === 'demo_krish_uid') {
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setProfile(userDocSnap.data() as UserProfile);
            setNeedsOnboarding(false);
          } else {
            setNeedsOnboarding(true);
          }
        } catch (err: any) {
          console.warn('Firestore offline (using local profile fallback):', err.message);
          const fallbackProfile: UserProfile = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Krish',
            email: firebaseUser.email || 'krish@deadlinezero.app',
            role: 'entrepreneur',
            createdAt: new Date().toISOString(),
            preferences: { workingHours: { start: '09:00', end: '18:00' }, timezone: 'IST', focusDuration: 120, quietHours: { start: '22:00', end: '07:00' }, emailDigestEnabled: true },
            behaviorProfile: { mostProductiveHours: [10, 14, 16], avgEstimationError: 1.25, procrastinationIndex: 35, strongestCategories: ['Core AI'] }
          };
          setProfile(fallbackProfile);
          setNeedsOnboarding(false);
        }
      } else {
        setProfile(null);
        setNeedsOnboarding(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setProfile, setLoading, setNeedsOnboarding]);

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const timeoutDuration = isLocal ? 2000 : 90000;
      const popupPromise = signInWithPopup(auth, googleProvider);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase OAuth timeout')), timeoutDuration));
      const result: any = await Promise.race([popupPromise, timeoutPromise]);
      const gUser = result.user;

      if (gUser) {
        try {
          const userDocRef = doc(db, 'users', gUser.uid);
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            const initialProfile: UserProfile = {
              uid: gUser.uid,
              name: gUser.displayName || 'Google User',
              email: gUser.email || '',
              role: 'entrepreneur',
              photoURL: gUser.photoURL || undefined,
              createdAt: new Date().toISOString(),
              preferences: { workingHours: { start: '09:00', end: '18:00' }, timezone: 'IST', focusDuration: 120, quietHours: { start: '22:00', end: '07:00' }, emailDigestEnabled: true },
              behaviorProfile: { mostProductiveHours: [10, 14, 16], avgEstimationError: 1.15, procrastinationIndex: 20, strongestCategories: ['Core AI'] }
            };
            await setDoc(userDocRef, initialProfile);
            setProfile(initialProfile);
          } else {
            setProfile(snap.data() as UserProfile);
          }
          setNeedsOnboarding(false);
        } catch (dbErr) {
          console.warn('Could not save Google profile to Firestore:', dbErr);
        }
      }
      return gUser;
    } catch (err: any) {
      console.warn('Firebase Auth popup offline/unconfigured. Engaging Mock Google Login:', err.message);
      const mockGoogleUser = {
        uid: 'demo_krish_uid',
        displayName: 'Krish Singh (Google)',
        email: 'krish@deadlinezero.app',
        photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=KrishGoogle',
        emailVerified: true,
      } as any;
      const fallbackProfile: UserProfile = {
        uid: 'demo_krish_uid',
        name: 'Krish Singh',
        email: 'krish@deadlinezero.app',
        role: 'entrepreneur',
        createdAt: new Date().toISOString(),
        preferences: { workingHours: { start: '09:00', end: '18:00' }, timezone: 'IST', focusDuration: 120, quietHours: { start: '22:00', end: '07:00' }, emailDigestEnabled: true },
        behaviorProfile: { mostProductiveHours: [10, 14, 16], avgEstimationError: 1.15, procrastinationIndex: 20, strongestCategories: ['Core AI'] }
      };
      try { await setDoc(doc(db, 'users', 'demo_krish_uid'), fallbackProfile); } catch (e) {}
      setUser(mockGoogleUser);
      setProfile(fallbackProfile);
      setNeedsOnboarding(false);
      return mockGoogleUser;
    }
  };

  const completeOnboarding = async (role: UserRole, preferences: UserPreferences) => {
    if (!user) throw new Error('No authenticated user found');
    setError(null);
    try {
      const newProfile: UserProfile = {
        uid: user.uid,
        name: user.displayName || 'User',
        email: user.email || '',
        role,
        photoURL: user.photoURL || undefined,
        createdAt: new Date().toISOString(),
        preferences,
        behaviorProfile: {
          mostProductiveHours: [9, 10, 11, 14, 15],
          avgEstimationError: 1.15,
          procrastinationIndex: 30,
          strongestCategories: ['General'],
        },
      };

      await setDoc(doc(db, 'users', user.uid), newProfile);
      setProfile(newProfile);
      setNeedsOnboarding(false);
      return newProfile;
    } catch (err: any) {
      console.error('Onboarding completion error:', err);
      setError(err.message || 'Failed to save user preferences');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed');
    }
  };

  return {
    user,
    profile,
    loading,
    needsOnboarding,
    error,
    loginWithGoogle,
    completeOnboarding,
    logout,
  };
}
