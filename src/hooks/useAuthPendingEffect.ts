import { useEffect, useRef } from 'react';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useAuthPendingStore } from 'stores/useAuthPendingStore';

export const useAuthPendingEffect = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const pendingAction = useAuthPendingStore(s => s.pendingAction);
  const setPendingAction = useAuthPendingStore(s => s.setPendingAction);
  const prevUserRef = useRef(firebaseUser);

  useEffect(() => {
    const prevUser = prevUserRef.current;
    prevUserRef.current = firebaseUser;

    if (firebaseUser && !prevUser && pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [firebaseUser, pendingAction, setPendingAction]);
};
