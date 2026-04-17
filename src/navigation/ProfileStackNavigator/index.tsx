import { MyLaundries } from 'features/MyLaundries/MyLaundries';
import { Profile } from 'features/Profile/Profile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  MyLaundries: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileHome" component={Profile} />
    <Stack.Screen name="MyLaundries" component={MyLaundries} />
  </Stack.Navigator>
);
