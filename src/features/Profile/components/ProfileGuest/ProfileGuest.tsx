import { View } from 'react-native';
import { Text } from 'components/Text/Text';
import { Button } from 'components/Button/Button';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

import { useProfileGuestTheme } from './theme/useProfileGuestTheme';
import { SvgImage } from 'components/SvgImage/SvgImage';

export const ProfileGuest = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useProfileGuestTheme();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name={'luvo-logo-pink'} height={128} width={128} />
        <Text fontSize="font-size-lg" fontWeight="semibold">
          Aún no iniciaste sesión
        </Text>
        <Text color="font-light" fontSize="font-size-sm">
          Inicia sesión para ver tu perfil y gestionar tu cuenta.
        </Text>
      </View>
      <Button label="Iniciar Sesión" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};
