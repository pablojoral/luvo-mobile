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
  const { settings: s, darkMode, setDarkMode, handleNotificationToggle, update } = useSettingsScreen();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Configuración" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SettingsGroup title="General">
          <SettingsRow
            type="toggle"
            icon="Settings"
            label="Modo oscuro"
            description="Cambia la apariencia de la app"
            value={darkMode}
            onToggle={setDarkMode}
          />
          <SettingsSeparator />
          <SettingsRow
            type="toggle"
            icon="MapPin"
            label="Modo propietario"
            description="Activa las pantallas de gestión de lavanderías"
            value={s?.ownerMode ?? false}
            onToggle={v => update({ ownerMode: v })}
          />
          <SettingsSeparator />
          <SettingsRow
            type="value"
            icon="Map"
            label="Idioma"
            description="Idioma de la interfaz"
            value={s?.language ?? 'es'}
            onPress={() => {}}
            readonly
          />
        </SettingsGroup>

        <SettingsGroup title="Notificaciones">
          <SettingsRow
            type="toggle"
            icon="Bell"
            label="Fin de ciclo"
            description="Avísame cuando termine el ciclo de lavado"
            value={s?.notifyEndOfCycle ?? true}
            onToggle={v => handleNotificationToggle({ notifyEndOfCycle: v }, v)}
          />
          <SettingsSeparator />
          <SettingsRow
            type="toggle"
            icon="Gift"
            label="Novedades y promociones"
            description="Recibí noticias sobre nuevas funciones y ofertas"
            value={s?.notifyPromotions ?? false}
            onToggle={v => handleNotificationToggle({ notifyPromotions: v }, v)}
          />
          <SettingsSeparator />
          <SettingsRow
            type="toggle"
            icon="AlertCircle"
            label="Alertas de mantenimiento"
            description="Notificaciones cuando una máquina no está disponible"
            value={s?.notifyMaintenance ?? true}
            onToggle={v => handleNotificationToggle({ notifyMaintenance: v }, v)}
          />
        </SettingsGroup>

      </ScrollView>
    </View>
  );
};
