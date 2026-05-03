import { Account } from 'features/Account/Account';
import { Auth } from 'features/Auth/Auth';
import { LaundryDetails } from 'features/LaundryDetails/LaundryDetails';
import { Settings } from 'features/Settings/Settings';
import { LaundryQR } from 'features/LaundryQR/LaundryQR';
import { LaundryRegistration } from 'features/LaundryRegistration/LaundryRegistration';
import { MachineDetails } from 'features/MachineDetails/MachineDetails';
import { MessagesModal } from 'features/Messages/MessagesModal';
import { QRScanner } from 'features/QRScanner/QRScanner';
import { Payment } from 'features/Payment/Payment';
import { Report } from 'features/Report/Report';
import { History } from 'features/History/History';
import { Info } from 'features/Info/Info';
import { Terms } from 'features/Info/Terms';
import { FAQ } from 'features/Info/FAQ';
import { About } from 'features/Info/About';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabsScreen } from './components/TabsScreen/TabsScreen';
import { useRootStackNavigatorTheme } from './theme/useRootStackNavigatorTheme';

export type RootStackParamList = {
  Tabs: undefined;
  Auth: { mode?: 'login' | 'register' } | undefined;
  Payment: { machineId: number };
  Report: { laundryId?: number; machineId?: number } | undefined;
  LaundryQR: { accessCode: string; laundryName: string };
  RegisterLaundry: { code: string };
  MachineDetails: { machineId: number };
  LaundryDetails: { laundryId: number };
  Settings: undefined;
  Account: undefined;
  History: undefined;
  Info: undefined;
  Terms: undefined;
  FAQ: undefined;
  About: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const { styles } = useRootStackNavigatorTheme();

  return (
    <View style={styles.fill}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Tabs" component={TabsScreen} />
        <RootStack.Screen name="Auth" component={Auth} options={{ presentation: 'modal', headerShown: false }} />
        <RootStack.Screen name="Payment" component={Payment} options={{ presentation: 'modal' }} />
        <RootStack.Screen name="Report" component={Report} />
        <RootStack.Screen name="LaundryQR" component={LaundryQR} options={{ presentation: 'modal' }} />
        <RootStack.Screen name="RegisterLaundry" component={LaundryRegistration} options={{ presentation: 'modal' }} />
        <RootStack.Screen name="MachineDetails" component={MachineDetails} />
        <RootStack.Screen name="LaundryDetails" component={LaundryDetails} />
        <RootStack.Screen name="Settings" component={Settings} />
        <RootStack.Screen name="Account" component={Account} />
        <RootStack.Screen name="History" component={History} />
        <RootStack.Screen name="Info" component={Info} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="FAQ" component={FAQ} />
        <RootStack.Screen name="About" component={About} />
      </RootStack.Navigator>
      <QRScanner />
      <MessagesModal />
    </View>
  );
};
