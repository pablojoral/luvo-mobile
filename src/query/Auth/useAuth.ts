import { useEffect } from 'react';

import { getAuth, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authService } from 'services/api/services/AuthService';
import { userService } from 'services/api/services/UserService';
import { deleteCurrentUser } from 'services/firebase/firebaseAuth';
import { AuthUser } from 'models/models';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { qk } from '../keys';

export function useFirebaseAuthState() {
  const qc = useQueryClient();

  // Keep cache in sync after the first emit
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
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
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
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
      qc.clear();
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name?: string; avatarId?: number | null }) =>
      userService.updateProfile(data),
    onMutate: async variables => {
      await qc.cancelQueries({ queryKey: qk.auth.me() });
      const previous = qc.getQueryData<AuthUser>(qk.auth.me());
      qc.setQueryData<AuthUser>(qk.auth.me(), old => (old ? { ...old, ...variables } : old));
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(qk.auth.me(), context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: qk.auth.me() }),
  });
}

export function useDeleteAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await userService.deleteAccount();
      await deleteCurrentUser();
    },
    onSuccess: () => {
      qc.clear();
    },
  });
}
