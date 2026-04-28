import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PatchUserSettings } from '../../../models/models';
import { useSettings, useUpdateSettings } from '../../../query/Settings/useSettings';
import { checkNotificationPermission } from '../../../services/notifications/notifications';
import type { SupportedLanguage } from '../../../services/i18n/languages';
import { getLanguageLabel } from '../../../services/i18n/languages';
import { useDarkModeStore } from '../../../stores/useDarkModeStore';
import { useMessagesStore } from '../../../stores/useMessagesStore';
import i18n from '../../../services/i18n/i18n';

export function useSettingsScreen() {
  const { t } = useTranslation('common');
  const { data: settings } = useSettings();
  const { mutate: update } = useUpdateSettings();

  const darkMode = useDarkModeStore(st => st.darkMode);
  const setDarkMode = useDarkModeStore(st => st.setDarkMode);
  const addMessage = useMessagesStore(st => st.addMessage);

  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);

  const openLanguagePicker = useCallback(() => setLanguagePickerVisible(true), []);
  const closeLanguagePicker = useCallback(() => setLanguagePickerVisible(false), []);

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

  const handleLanguageSelect = useCallback(
    (lang: SupportedLanguage) => {
      update({ language: lang });
      closeLanguagePicker();
    },
    [update, closeLanguagePicker],
  );

  const currentLanguageLabel = getLanguageLabel(
    settings?.language ?? i18n.resolvedLanguage ?? 'es',
  );

  return {
    settings,
    update,
    darkMode,
    setDarkMode,
    handleNotificationToggle,
    languagePickerVisible,
    openLanguagePicker,
    closeLanguagePicker,
    handleLanguageSelect,
    currentLanguageLabel,
    strings: {
      screenTitle: t('settings.title'),
      generalTitle: t('settings.general.title'),
      notificationsTitle: t('settings.notifications.title'),
      darkModeLabel: t('settings.darkMode.label'),
      darkModeDescription: t('settings.darkMode.description'),
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
