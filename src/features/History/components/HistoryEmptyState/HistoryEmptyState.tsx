import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { useHistoryTheme } from '../../theme/useHistoryTheme';
import { useHistoryEmptyState } from './hooks/useHistoryEmptyState';

export const HistoryEmptyState = () => {
  const { styles } = useHistoryTheme();
  const { emptyText } = useHistoryEmptyState();

  return (
    <View style={styles.empty}>
      <Text color="font-secondary">{emptyText}</Text>
    </View>
  );
};
