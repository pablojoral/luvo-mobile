import { useTheme } from 'theme/hooks/useTheme';

import { NavigationContainer } from '@react-navigation/native';

import { RootStackNavigator } from './RootStackNavigator';

export const Navigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme.navigation}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
