import { Text } from '@luvo/ui';
import { View } from 'react-native';

import { useHistoryListFooterStrings } from './hooks/useHistoryListFooterStrings';
import { useHistoryListFooterTheme } from './theme/useHistoryListFooterTheme';

export const HistoryListFooter = () => {
  const { styles } = useHistoryListFooterTheme();
  const { endOfListText } = useHistoryListFooterStrings();

  return (
    <View style={styles.container}>
      <Text color="font-secondary">{endOfListText}</Text>
    </View>
  );
};
