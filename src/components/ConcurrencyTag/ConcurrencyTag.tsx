import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useConcurrencyTag } from './hooks/useConcurrencyTag';
import { useConcurrencyTagTheme } from './theme/useConcurrencyTagTheme';

interface ConcurrencyTagProps {
  available: number;
  total: number;
}

export const ConcurrencyTag = ({ available, total }: ConcurrencyTagProps) => {
  const { label, color } = useConcurrencyTag({ available, total });
  const { styles, dotStyle } = useConcurrencyTagTheme(color);

  return (
    <View style={styles.row}>
      <View style={dotStyle} />
      <Text fontSize="font-size-sm" color={color}>{label}</Text>
    </View>
  );
};
