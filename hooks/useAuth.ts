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
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'Google authentication failed');
      throw err;
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
