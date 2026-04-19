import { PatchUserSettings } from '../../../models/models';
import { useSettings, useUpdateSettings } from '../../../query/Settings/useSettings';
import { checkNotificationPermission } from '../../../services/notifications/notifications';
import { useDarkModeStore } from '../../../stores/useDarkModeStore';
import { useMessagesStore } from '../../../stores/useMessagesStore';

export function useSettingsScreen() {
  const { data: settings } = useSettings();
  const { mutate: update } = useUpdateSettings();

  const darkMode    = useDarkModeStore(st => st.darkMode);
  const setDarkMode = useDarkModeStore(st => st.setDarkMode);
  const addMessage  = useMessagesStore(st => st.addMessage);

  const handleNotificationToggle = async (field: PatchUserSettings, value: boolean) => {
    update(field);
    if (!value) return;
    const status = await checkNotificationPermission();
    console.log('[Settings]', status);
    if (status !== 'granted') {
      addMessage({
        title: 'Notificaciones desactivadas',
        body: 'Para recibir estas notificaciones, habilitá los permisos en la configuración de tu dispositivo.',
      });
    }
  };

  return {
    settings,
    update,
    darkMode,
    setDarkMode,
    handleNotificationToggle,
  };
}
