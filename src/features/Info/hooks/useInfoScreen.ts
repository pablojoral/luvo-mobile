import type { SettingsMenuItemData } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useTranslation } from 'react-i18next';

export const useInfoScreen = () => {
  const { t } = useTranslation('common');
  const navigation = useRootStackNavigation();

  const items: SettingsMenuItemData[] = [
    { label: t('info.menu.terms'),   iconName: 'Clipboard',    onPress: () => navigation.navigate('Terms') },
    { label: t('info.menu.faq'),     iconName: 'AlertCircle',  onPress: () => navigation.navigate('FAQ') },
    { label: t('info.menu.about'),   iconName: 'LuvoCircle',         onPress: () => navigation.navigate('About') },
  ];

  const handleGoBack = () => navigation.goBack();

  return { title: t('info.title'), items, handleGoBack };
};
