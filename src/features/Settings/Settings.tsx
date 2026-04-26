import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { ScrollView, View } from 'react-native';

import { useSettingsScreen } from './hooks/useSettingsScreen';
import { SettingsGroup } from './components/SettingsGroup/SettingsGroup';
import { SettingsRow } from './components/SettingsRow/SettingsRow';
import { SettingsSeparator } from './components/SettingsSeparator/SettingsSeparator';
import { useSettingsTheme } from './theme/useSettingsTheme';

export const Settings = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useSettingsTheme();
  const { settings: s, darkMode, setDarkMode, handleNotificationToggle, update, strings } = useSettingsScreen();

  return (
    <View style={styles.container}>
      <ScreenHeader title={strings.screenTitle} onBack={() => navigation.goBack()} />

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
          <SettingsSeparator />
          <SettingsRow
            type="toggle"
            icon="MapPin"
            label={strings.ownerModeLabel}
            description={strings.ownerModeDescription}
            value={s?.ownerMode ?? false}
            onToggle={v => update({ ownerMode: v })}
          />
          <SettingsSeparator />
          <SettingsRow
            type="value"
            icon="Map"
            label={strings.languageLabel}
            description={strings.languageDescription}
            value={s?.language ?? 'es'}
            onPress={() => {}}
            readonly
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
          <SettingsSeparator />
          <SettingsRow
            type="toggle"
            icon="Gift"
            label={strings.promotionsLabel}
            description={strings.promotionsDescription}
            value={s?.notifyPromotions ?? false}
            onToggle={v => handleNotificationToggle({ notifyPromotions: v }, v)}
          />
          <SettingsSeparator />
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
  );
};
