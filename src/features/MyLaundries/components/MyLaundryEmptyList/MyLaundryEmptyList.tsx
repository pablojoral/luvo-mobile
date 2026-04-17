import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useMyLaundryEmptyListTheme } from './theme/useMyLaundryEmptyListTheme';

export const MyLaundryEmptyList = () => {
  const styles = useMyLaundryEmptyListTheme();

  return (
    <View style={styles.container}>
      <SvgIcon name={'Star'} size="font-size-xxxxl" />
      <Text fontSize="font-size-lg" fontWeight="semibold">
        Sin lavanderías
      </Text>
      <Text fontSize="font-size-sm" color={'font-disabled'} style={styles.emptyText}>
        Registrá una lavandería privada con tu código o agregá una pública desde el mapa.
      </Text>
    </View>
  );
};
