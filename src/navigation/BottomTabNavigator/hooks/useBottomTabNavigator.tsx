import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { FontColor } from 'theme/types/Theme';
import { useBottomTabNavigatorTheme } from '../theme/useBottomTabNavigatorTheme';
import { useBottomTabNavigatorStrings } from './useBottomTabNavigatorStrings';

type TabRouteName = 'Laundry' | 'MyLaundries' | 'Profile';

const iconMap: Record<TabRouteName, IconName> = {
  Laundry: 'MapPin',
  MyLaundries: 'Star',
  Profile: 'Profile',
};

export const useBottomTabNavigator = () => {
  const { tabTitles } = useBottomTabNavigatorStrings();
  const { tabBarStyle, tabBarLabelStyle, tabBarIconStyle, theme } = useBottomTabNavigatorTheme();

  const getTabBarIcon = (routeName: string, focused: boolean) => {
    const colorName: FontColor = focused ? 'font-highlight' : 'font-light';
    const name = iconMap[routeName as TabRouteName];
    return <SvgIcon name={name!} size={'icon-size-xl'} color={colorName} />;
  };

  return {
    tabBarStyle,
    tabBarLabelStyle,
    tabBarIconStyle,
    theme,
    getTabBarIcon,
    tabTitles,
  };
};
