import { View } from 'react-native';

import { useSettingsSeparatorTheme } from './theme/useSettingsSeparatorTheme';

export const SettingsSeparator = () => {
  const { styles } = useSettingsSeparatorTheme();
  return <View style={styles.separator} />;
};
