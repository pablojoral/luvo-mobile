import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { FontColor } from 'theme/types/Theme';
import { useBottomTabNavigatorTheme } from '../theme/useBottomTabNavigatorTheme';

type TabRouteName = 'Laundry' | 'MyLaundries' | 'Profile';

const iconMap: Record<TabRouteName, IconName> = {
  Laundry: 'MapPin',
  MyLaundries: 'Star',
  Profile: 'Profile',
};

export const useBottomTabNavigator = () => {
  const { tabBarStyle, tabBarLabelStyle, tabBarIconStyle, theme } = useBottomTabNavigatorTheme();

  const getTabBarIcon = (routeName: string, focused: boolean) => {
    const colorName: FontColor = focused ? 'font-highlight' : 'font-light';
    const name = iconMap[routeName as TabRouteName];
    return <SvgIcon name={name!} size={'font-size-xxl'} color={colorName} />;
  };

  return {
    tabBarStyle,
    tabBarLabelStyle,
    tabBarIconStyle,
    theme,
    getTabBarIcon,
  };
};
