import { useEffect } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authService } from 'services/api/services/AuthService';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { qk } from '../keys';

export function useFirebaseAuthState() {
  const qc = useQueryClient();

  // Keep cache in sync after the first emit
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      qc.setQueryData(qk.auth.firebaseUser(), user);
    });
    return unsubscribe;
  }, [qc]);

  return useQuery<FirebaseAuthTypes.User | null>({
    queryKey: qk.auth.firebaseUser(),
    // Resolves on the first onAuthStateChanged callback, giving React Query
    // its initial value (and driving the isLoading state).
    queryFn: () =>
      new Promise<FirebaseAuthTypes.User | null>(resolve => {
        const unsubscribe = auth().onAuthStateChanged(user => {
          resolve(user);
          unsubscribe();
        });
      }),
    staleTime: Infinity, // never auto-refetch; the subscription owns updates
  });
}

export function useMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: qk.auth.me(),
    queryFn: () => authService.me(),
    enabled: options?.enabled ?? true,
    staleTime: 60 * 1000, // user rarely changes
  });
}

// If your backend has a session initializer (optional)
// export function useEnsureSession() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: () => authService.ensureSession(),
//     onSuccess: () => qc.invalidateQueries({ queryKey: qk.auth.root }),
//   });
// }

export function useSignOut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: qk.auth.me() });
    },
  });
}
