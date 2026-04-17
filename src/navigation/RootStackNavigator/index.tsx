import { Auth } from 'features/Auth/Auth';
import { LaundryDetailsModal } from 'features/LaundryDetailsModal/LaundryDetailsModal';
import { MessagesModal } from 'features/Messages/MessagesModal';
import { Payment } from 'features/Payment/Payment';
import { BottomTabNavigator } from 'navigation/BottomTabNavigator';
import { StyleSheet, View } from 'react-native';
import { useLaundriesSocket } from 'services/ws/useLaundriesSocket';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  Auth: { mode?: 'login' | 'register' } | undefined;
  Payment: { machineId: number };
};

/**
 * TabsScreen wraps the tab navigator so the WS connection and the
 * LaundryDetailsModal overlay are mounted at a stable level — persisting
 * across tab switches and Payment modal opens.
 *
 * LaundryDetailsModal is an absolute-positioned bottom sheet driven by
 * useSelectedLaundry — it must NOT be a navigation screen.
 */
const TabsScreen = () => {
  useLaundriesSocket();
  return (
    <View style={styles.fill}>
      <BottomTabNavigator />
      <LaundryDetailsModal />
      <MessagesModal />
    </View>
  );
};

const styles = StyleSheet.create({ fill: { flex: 1 } });

export const RootStackNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={TabsScreen} />
      <RootStack.Screen
        name="Auth"
        component={Auth}
        options={{ presentation: 'modal', headerShown: false }}
      />
      <RootStack.Screen
        name="Payment"
        component={Payment}
        options={{ presentation: 'modal' }}
      />
    </RootStack.Navigator>
  );
};
