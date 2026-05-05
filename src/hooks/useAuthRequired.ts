import { useCallback } from 'react';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useAuthModalStore } from 'stores/useAuthModalStore';
import { useAuthPendingStore } from 'stores/useAuthPendingStore';

export const useAuthRequired = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const navigation = useRootStackNavigation();
  const showAuthModal = useAuthModalStore(s => s.show);
  const setPendingAction = useAuthPendingStore(s => s.setPendingAction);

  const requireAuth = useCallback(
    <T extends unknown[]>(fn: (...args: T) => void) =>
      (...args: T): void => {
        if (firebaseUser) {
          fn(...args);
          return;
        }
        showAuthModal(() => {
          setPendingAction(() => fn(...args));
          navigation.navigate('Auth');
        });
      },
    [firebaseUser, navigation, showAuthModal, setPendingAction],
  );

  return { requireAuth, isAuthenticated: !!firebaseUser };
};
