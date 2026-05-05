import { AppState } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager, QueryCache, QueryClient } from '@tanstack/react-query';

import { useMessagesStore } from 'stores/useMessagesStore';
import { classifyQueryError } from './classifyQueryError';

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
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.meta?.suppressGlobalError) return;
      const message = classifyQueryError(error);
      if (message === null) return;
      useMessagesStore.getState().addMessage({ body: message });
    },
  }),
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
