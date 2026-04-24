import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PatchUserSettings, UserSettings } from '../../models/models';
import { settingsService } from '../../services/api/services/SettingsService';
import { useFirebaseAuthState } from '../Auth/useAuth';
import { qk } from '../keys';

export function useSettings() {
  const { data: firebaseUser } = useFirebaseAuthState();

  return useQuery({
    queryKey: qk.settings.me(),
    queryFn:  () => settingsService.get(),
    staleTime: 60_000,
    enabled:   firebaseUser != null,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const key = qk.settings.me();

  return useMutation({
    mutationFn: (body: PatchUserSettings) => settingsService.patch(body),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<UserSettings>(key);
      const defaults: UserSettings = {
        ownerMode:         false,
        language:          'es',
        notifyEndOfCycle:  true,
        notifyPromotions:  false,
        notifyMaintenance: true,
        updatedAt:         new Date().toISOString(),
      };
      queryClient.setQueryData<UserSettings>(key, (old) => ({
        ...defaults,
        ...(old ?? {}),
        ...variables,
      }));
      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(key, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
}
