import { Laundries } from 'features/Laundries/Laundries';
import { MyLaundries } from 'features/MyLaundries/MyLaundries';
import { Profile } from 'features/Profile/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useBottomTabNavigator } from './hooks/useBottomTabNavigator';

type TabParamList = {
  Laundry: undefined;
  MyLaundries: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabNavigator = () => {
  const { tabBarStyle, tabBarLabelStyle, tabBarIconStyle, theme, getTabBarIcon } =
    useBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Laundry"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle,
        tabBarActiveTintColor: theme.fontColor['font-highlight'],
        tabBarInactiveTintColor: theme.fontColor['font-light'],
        tabBarStyle,
        tabBarIconStyle,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
      })}
    >
      <Tab.Screen
        name="Laundry"
        component={Laundries}
        options={{ title: 'Locales', tabBarButtonTestID: 'tab-laundry' }}
      />
      <Tab.Screen
        name="MyLaundries"
        component={MyLaundries}
        options={{ title: 'Mis lavanderías', tabBarButtonTestID: 'tab-my-laundries' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Perfil', tabBarButtonTestID: 'tab-profile' }}
      />
    </Tab.Navigator>
  );
};
