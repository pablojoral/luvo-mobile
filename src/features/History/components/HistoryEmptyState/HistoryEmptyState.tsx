import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useHistoryEmptyState } from './hooks/useHistoryEmptyState';
import { useHistoryEmptyStateTheme } from './theme/useHistoryEmptyStateTheme';

export const HistoryEmptyState = () => {
  const { styles } = useHistoryEmptyStateTheme();
  const { emptyText } = useHistoryEmptyState();

  return (
    <View style={styles.container}>
      <Text color="font-secondary">{emptyText}</Text>
    </View>
  );
};
