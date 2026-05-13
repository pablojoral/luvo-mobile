import { SafeScreenHeader } from '@luvo/ui';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { ScrollView, View } from 'react-native';

import { useSettingsScreen } from './hooks/useSettingsScreen';
import { SettingsGroup } from './components/SettingsGroup/SettingsGroup';
import { SettingsRow } from './components/SettingsRow/SettingsRow';
import { LanguagePicker } from './components/LanguagePicker/LanguagePicker';
import type { SupportedLanguage } from 'services/i18n/languages';
import { useSettingsTheme } from './theme/useSettingsTheme';

export const Settings = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useSettingsTheme();
  const {
    settings: s,
    darkMode,
    setDarkMode,
    handleNotificationToggle,
    languagePickerVisible,
    openLanguagePicker,
    closeLanguagePicker,
    handleLanguageSelect,
    currentLanguageLabel,
    strings,
  } = useSettingsScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={strings.screenTitle} onBack={() => navigation.goBack()} />

      <View style={styles.body}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SettingsGroup title={strings.generalTitle}>
          <SettingsRow
            type="toggle"
            icon="Settings"
            label={strings.darkModeLabel}
            description={strings.darkModeDescription}
            value={darkMode}
            onToggle={setDarkMode}
          />
          <SettingsRow
            type="value"
            icon="Map"
            label={strings.languageLabel}
            description={strings.languageDescription}
            value={currentLanguageLabel}
            onPress={openLanguagePicker}
          />
        </SettingsGroup>

        <SettingsGroup title={strings.notificationsTitle}>
          <SettingsRow
            type="toggle"
            icon="Bell"
            label={strings.endOfCycleLabel}
            description={strings.endOfCycleDescription}
            value={s?.notifyEndOfCycle ?? true}
            onToggle={v => handleNotificationToggle({ notifyEndOfCycle: v }, v)}
          />
          <SettingsRow
            type="toggle"
            icon="Gift"
            label={strings.promotionsLabel}
            description={strings.promotionsDescription}
            value={s?.notifyPromotions ?? false}
            onToggle={v => handleNotificationToggle({ notifyPromotions: v }, v)}
          />
          <SettingsRow
            type="toggle"
            icon="AlertCircle"
            label={strings.maintenanceLabel}
            description={strings.maintenanceDescription}
            value={s?.notifyMaintenance ?? true}
            onToggle={v => handleNotificationToggle({ notifyMaintenance: v }, v)}
          />
        </SettingsGroup>
      </ScrollView>
      </View>

      <LanguagePicker
        visible={languagePickerVisible}
        currentLanguage={(s?.language ?? 'es') as SupportedLanguage}
        onSelect={handleLanguageSelect}
        onClose={closeLanguagePicker}
      />
    </View>
  );
};
