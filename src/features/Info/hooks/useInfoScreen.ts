import type { SettingsMenuItemData } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

export const useInfoScreen = () => {
  const navigation = useRootStackNavigation();

  const items: SettingsMenuItemData[] = [
    { label: 'Términos y condiciones', iconName: 'Clipboard', onPress: () => navigation.navigate('Terms') },
    { label: 'Preguntas frecuentes',   iconName: 'AlertCircle', onPress: () => navigation.navigate('FAQ') },
    { label: 'Acerca de',              iconName: 'Info',        onPress: () => navigation.navigate('About') },
  ];

  const handleGoBack = () => navigation.goBack();

  return { items, handleGoBack };
};
