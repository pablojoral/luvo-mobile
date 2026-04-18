import { Auth } from 'features/Auth/Auth';
import { LaundryDetails } from 'features/LaundryDetails/LaundryDetails';
import { LaundryQR } from 'features/LaundryQR/LaundryQR';
import { LaundryRegistration } from 'features/LaundryRegistration/LaundryRegistration';
import { MachineDetails } from 'features/MachineDetails/MachineDetails';
import { MessagesModal } from 'features/Messages/MessagesModal';
import { QRScanner } from 'features/QRScanner/QRScanner';
import { Payment } from 'features/Payment/Payment';
import { Report } from 'features/Report/Report';
import { BottomTabNavigator } from 'navigation/BottomTabNavigator';
import { StyleSheet, View } from 'react-native';
import { useLaundriesSocket } from 'services/ws/useLaundriesSocket';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  Auth: { mode?: 'login' | 'register' } | undefined;
  Payment: { machineId: number };
  Report: { laundryId?: number; machineId?: number } | undefined;
  LaundryQR: { accessCode: string; laundryName: string };
  RegisterLaundry: { code: string };
  MachineDetails: { machineId: number };
  LaundryDetails: { laundryId: number };
};

const TabsScreen = () => {
  useLaundriesSocket();
  return (
    <View style={styles.fill}>
      <BottomTabNavigator />
      <MessagesModal />
      <QRScanner />
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
      <RootStack.Screen
        name="Report"
        component={Report}
        options={{ presentation: 'modal' }}
      />
      <RootStack.Screen
        name="LaundryQR"
        component={LaundryQR}
        options={{ presentation: 'modal' }}
      />
      <RootStack.Screen
        name="RegisterLaundry"
        component={LaundryRegistration}
        options={{ presentation: 'modal' }}
      />
      <RootStack.Screen
        name="MachineDetails"
        component={MachineDetails}
        options={{ presentation: 'modal' }}
      />
      <RootStack.Screen
        name="LaundryDetails"
        component={LaundryDetails}
        options={{ presentation: 'modal' }}
      />
    </RootStack.Navigator>
  );
};
