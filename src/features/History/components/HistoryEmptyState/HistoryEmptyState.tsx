import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useHistoryEmptyStateStrings } from './hooks/useHistoryEmptyStateStrings';
import { useHistoryEmptyStateTheme } from './theme/useHistoryEmptyStateTheme';

export const HistoryEmptyState = () => {
  const { styles } = useHistoryEmptyStateTheme();
  const { emptyText } = useHistoryEmptyStateStrings();

  return (
    <View style={styles.container}>
      <Text color="font-secondary">{emptyText}</Text>
    </View>
  );
};
