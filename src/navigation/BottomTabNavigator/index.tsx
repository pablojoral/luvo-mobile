import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Laundries } from 'features/Laundries/Laundries';
import { Scan } from 'features/Scan/Scan';
import { ProfileStackNavigator } from 'navigation/ProfileStackNavigator';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor } from 'theme/types/Theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Laundry: undefined;
  QrScanner: undefined;
  Profile: undefined;
};

type TabRouteName = keyof TabParamList;

const LaundryScreen = () => <Laundries />;
const ScanScreen = () => <Scan />;

const Tab = createBottomTabNavigator<TabParamList>();

const iconMap: Record<TabRouteName, IconName> = {
  Laundry: 'MapPin',
  QrScanner: 'QrCode',
  Profile: 'Profile',
};

export const BottomTabNavigator = () => {
  const theme = useTheme();

  const getTabBarIconName = (routeName: string, focused: boolean) => {
    let name: IconName;

    const colorName: FontColor = focused ? 'font-highlight' : 'font-light';
    name = iconMap[routeName as TabRouteName];
    return <SvgIcon name={name!} size={'font-size-xxl'} color={colorName} />;
  };

  return (
    <Tab.Navigator
      initialRouteName="Laundry"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { fontSize: theme.fontSize['font-size-md'] },
        tabBarActiveTintColor: theme.fontColor['font-highlight'],
        tabBarInactiveTintColor: theme.fontColor['font-light'],
        tabBarStyle: {
          borderRadius: theme.cornerRad['corner-rad-xxl'],
          backgroundColor: theme.surfaceColor['surface-primary'],
          position: 'absolute',
          height: theme.navBarHeight,
          paddingTop: theme.spacing['spacing-sm'],
          borderTopWidth: 0,
          // Shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarIconStyle: {
          marginBottom: theme.spacing['spacing-xs'],
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => getTabBarIconName(route.name, focused),
      })}
    >
      <Tab.Screen
        name="Laundry"
        component={LaundryScreen}
        options={{ title: 'Locales', tabBarButtonTestID: 'tab-laundry' }}
      />
      <Tab.Screen
        name="QrScanner"
        component={ScanScreen}
        options={{ title: 'Escanear', tabBarButtonTestID: 'tab-scan' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ title: 'Perfil', tabBarButtonTestID: 'tab-profile' }}
      />
    </Tab.Navigator>
  );
};
