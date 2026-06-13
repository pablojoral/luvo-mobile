import { StatusBar } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';

import { RootStackNavigator, RootStackParamList } from './RootStackNavigator';
import { navigationRef } from './navigationRef';

const linking: LinkingOptions<RootStackParamList> = {
  // luvo:// = custom scheme (QR scans in-app, MP redirects).
  // https://luvolaundries.com = Universal Links (iOS) / App Links (Android) —
  // verified against /.well-known/ files served by luvo-server.
  prefixes: ['luvo://', 'https://luvolaundries.com'],
  config: {
    screens: {
      Tabs: '',
      RegisterLaundry: {
        path: 'register-access',
        parse: { code: (code: string) => code },
      },
      MachineDetails: {
        path: 'machine/:machineId',
        parse: { machineId: (id: string) => parseInt(id, 10) },
      },
      LaundryDetails: {
        path: 'laundry/:laundryId',
        parse: { laundryId: (id: string) => parseInt(id, 10) },
      },
    },
  },
};

export const Navigator = () => {
  const theme = useTheme();
  const isDark = theme.navigation.dark;

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.navigation.colors.background}
      />
      <NavigationContainer ref={navigationRef} linking={linking} theme={theme.navigation}>
        <RootStackNavigator />
      </NavigationContainer>
    </>
  );
};
