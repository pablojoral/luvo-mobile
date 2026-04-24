import { View } from 'react-native';
import { useSettingsTheme } from 'features/Settings/theme/useSettingsTheme';

export const SettingsSeparator = () => {
  const { styles } = useSettingsTheme();
  return <View style={styles.rowSeparator} />;
};
