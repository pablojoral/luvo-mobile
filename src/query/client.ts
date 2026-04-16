import { AppState } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager, QueryClient } from '@tanstack/react-query';

onlineManager.setEventListener(setOnline => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
  return unsubscribe;
});

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener('change', status => {
    handleFocus(status === 'active');
  });
  return () => subscription.remove();
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 5 * 60 * 1000,
      staleTime: 30 * 1000,
      refetchOnMount: true,
      refetchOnWindowFocus: true, // refetch on app foreground
      refetchOnReconnect: true,
    },
    mutations: { retry: 0 },
  },
});
