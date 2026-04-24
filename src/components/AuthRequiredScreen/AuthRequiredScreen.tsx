import { Button } from 'components/Button/Button';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { View } from 'react-native';

import { useAuthRequiredScreenTheme } from './theme/useAuthRequiredScreenTheme';

type Props = {
  subtitle?: string;
};

export const AuthRequiredScreen = ({ subtitle = 'Inicia sesión para continuar.' }: Props) => {
  const navigation = useRootStackNavigation();
  const { styles } = useAuthRequiredScreenTheme();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name={'luvo-logo-pink'} height={128} width={128} />
        <Text fontSize="font-size-lg" fontWeight="semibold">
          Aún no iniciaste sesión
        </Text>
        <Text color="font-light" fontSize="font-size-sm">
          {subtitle}
        </Text>
      </View>
      <Button label="Iniciar Sesión" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};
