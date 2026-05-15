import type { SettingsMenuItemData } from '@luvo/ui';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useInfoStrings } from './useInfoStrings';

export const useInfoScreen = () => {
  const navigation = useRootStackNavigation();
  const strings = useInfoStrings();

  const items: SettingsMenuItemData[] = [
    { label: strings.termsLabel, iconName: 'Clipboard',   onPress: () => navigation.navigate('Terms') },
    { label: strings.faqLabel,   iconName: 'AlertCircle', onPress: () => navigation.navigate('FAQ') },
    { label: strings.aboutLabel, iconName: 'LuvoCircle',  onPress: () => navigation.navigate('About') },
  ];

  const handleGoBack = () => navigation.goBack();

  return { title: strings.title, items, handleGoBack };
};
