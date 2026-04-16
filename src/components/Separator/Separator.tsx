import { View } from 'react-native';

import { useSeparatorTheme } from './theme/useSeparatorTheme';
import { memo } from 'react';

export const Separator = memo(() => {
  const { styles } = useSeparatorTheme();
  return <View style={styles.container} />;
});
