import { Laundries } from 'features/Laundries/Laundries';
import { History } from 'features/History/History';
import { QRScanScreen } from 'features/QRScanner/QRScanScreen';
import { Profile } from 'features/Profile/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useBottomTabNavigator } from './hooks/useBottomTabNavigator';

type TabParamList = {
  Laundry:  undefined;
  History:  undefined;
  QRScan:   undefined;
  Profile:  undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabNavigator = () => {
  const { tabBarStyle, tabBarLabelStyle, tabBarIconStyle, theme, getTabBarIcon, tabTitles, requireAuth } =
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
        options={{ title: tabTitles.laundry, tabBarButtonTestID: 'tab-laundry' }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ title: tabTitles.history, tabBarButtonTestID: 'tab-history' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            requireAuth(() => navigation.navigate('History'))();
          },
        })}
      />
      <Tab.Screen
        name="QRScan"
        component={QRScanScreen}
        options={{ title: tabTitles.scan, tabBarButtonTestID: 'tab-qrscan' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: tabTitles.profile, tabBarButtonTestID: 'tab-profile' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            requireAuth(() => navigation.navigate('Profile'))();
          },
        })}
      />
    </Tab.Navigator>
  );
};
