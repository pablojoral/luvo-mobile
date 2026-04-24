import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SettingsMenu } from 'components/SettingsMenu/SettingsMenu';
import { View } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

import { useInfoTheme } from './theme/useInfoTheme';

export const Info = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useInfoTheme();

  const items = [
    { label: 'Términos y condiciones', iconName: 'Clipboard' as const, onPress: () => navigation.navigate('Terms') },
    { label: 'Preguntas frecuentes',   iconName: 'AlertCircle' as const, onPress: () => navigation.navigate('FAQ') },
    { label: 'Acerca de',              iconName: 'Info' as const,         onPress: () => navigation.navigate('About') },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Información" onBack={() => navigation.goBack()} />
      <View style={styles.scrollContent}>
        <SettingsMenu items={items} />
      </View>
    </View>
  );
};
