import { BottomTabNavigator } from 'navigation/BottomTabNavigator';
import { View } from 'react-native';
import { useLaundriesSocket } from 'services/ws/useLaundriesSocket';
import { useTabsScreenTheme } from './theme/useTabsScreenTheme';

export const TabsScreen = () => {
  useLaundriesSocket();
  const { styles } = useTabsScreenTheme();

  return (
    <View style={styles.fill}>
      <BottomTabNavigator />
    </View>
  );
};
