import { useCallback, useState } from 'react';
import { useSettingsStrings } from './useSettingsStrings';
import { PatchUserSettings } from '../../../models/models';
import { useSettings, useUpdateSettings } from '../../../query/Settings/useSettings';
import { checkNotificationPermission } from '../../../services/notifications/notifications';
import type { SupportedLanguage } from '../../../services/i18n/languages';
import { getLanguageLabel } from '../../../services/i18n/languages';
import { useDarkModeStore } from '../../../stores/useDarkModeStore';
import { useMessagesStore } from '../../../stores/useMessagesStore';
import i18n from '../../../services/i18n/i18n';

export function useSettingsScreen() {
  const strings = useSettingsStrings();
  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  const darkMode = useDarkModeStore(st => st.darkMode);
  const setDarkMode = useDarkModeStore(st => st.setDarkMode);
  const addMessage = useMessagesStore(st => st.addMessage);

  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);

  const openLanguagePicker = useCallback(() => setLanguagePickerVisible(true), []);
  const closeLanguagePicker = useCallback(() => setLanguagePickerVisible(false), []);

  const handleNotificationToggle = async (field: PatchUserSettings, value: boolean) => {
    updateSettings(field);
    if (!value) return;
    const status = await checkNotificationPermission();
    if (status !== 'granted') {
      addMessage({
        title: strings.notificationsDisabledTitle,
        body: strings.notificationsDisabledBody,
      });
    }
  };

  const handleLanguageSelect = useCallback(
    (lang: SupportedLanguage) => {
      updateSettings({ language: lang });
      closeLanguagePicker();
    },
    [updateSettings, closeLanguagePicker],
  );

  const currentLanguageLabel = getLanguageLabel(
    settings?.language ?? i18n.resolvedLanguage ?? 'es',
  );

  return {
    settings,
    darkMode,
    setDarkMode,
    handleNotificationToggle,
    languagePickerVisible,
    openLanguagePicker,
    closeLanguagePicker,
    handleLanguageSelect,
    currentLanguageLabel,
    strings,
  };
}
