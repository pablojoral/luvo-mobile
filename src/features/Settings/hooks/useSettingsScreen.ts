import { useTranslation } from 'react-i18next';
import { PatchUserSettings } from '../../../models/models';
import { useSettings, useUpdateSettings } from '../../../query/Settings/useSettings';
import { checkNotificationPermission } from '../../../services/notifications/notifications';
import { useDarkModeStore } from '../../../stores/useDarkModeStore';
import { useMessagesStore } from '../../../stores/useMessagesStore';

export function useSettingsScreen() {
  const { t } = useTranslation('common');
  const { data: settings } = useSettings();
  const { mutate: update } = useUpdateSettings();

  const darkMode = useDarkModeStore(st => st.darkMode);
  const setDarkMode = useDarkModeStore(st => st.setDarkMode);
  const addMessage = useMessagesStore(st => st.addMessage);

  const handleNotificationToggle = async (field: PatchUserSettings, value: boolean) => {
    update(field);
    if (!value) return;
    const status = await checkNotificationPermission();
    if (status !== 'granted') {
      addMessage({
        title: t('settings.notificationsDisabled.title'),
        body: t('settings.notificationsDisabled.body'),
      });
    }
  };

  return {
    settings,
    update,
    darkMode,
    setDarkMode,
    handleNotificationToggle,
    strings: {
      screenTitle: t('settings.title'),
      generalTitle: t('settings.general.title'),
      notificationsTitle: t('settings.notifications.title'),
      darkModeLabel: t('settings.darkMode.label'),
      darkModeDescription: t('settings.darkMode.description'),
      ownerModeLabel: t('settings.ownerMode.label'),
      ownerModeDescription: t('settings.ownerMode.description'),
      languageLabel: t('settings.language.label'),
      languageDescription: t('settings.language.description'),
      endOfCycleLabel: t('settings.endOfCycle.label'),
      endOfCycleDescription: t('settings.endOfCycle.description'),
      promotionsLabel: t('settings.promotions.label'),
      promotionsDescription: t('settings.promotions.description'),
      maintenanceLabel: t('settings.maintenance.label'),
      maintenanceDescription: t('settings.maintenance.description'),
    },
  };
}
