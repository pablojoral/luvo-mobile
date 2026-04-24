import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { useHistoryTheme } from '../../theme/useHistoryTheme';

export const HistoryEmptyState = () => {
  const { styles } = useHistoryTheme();

  return (
    <View style={styles.empty}>
      <Text color="font-secondary">No tenés ciclos registrados aún.</Text>
    </View>
  );
};
