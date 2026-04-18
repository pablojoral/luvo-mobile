import { useTheme } from 'theme/hooks/useTheme';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';

import { RootStackNavigator, RootStackParamList } from './RootStackNavigator';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['luvo://'],
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
  return (
    <NavigationContainer linking={linking} theme={theme.navigation}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
