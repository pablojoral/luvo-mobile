import { Skeleton } from '@luvo/ui';
import { View } from 'react-native';

import { useHistorySkeletonTheme } from './theme/useHistorySkeletonTheme';

const ROW_COUNT = 4;
const ROWS = Array.from({ length: ROW_COUNT }, (_, i) => i);

export const HistorySkeleton = () => {
  const { styles, iconSize } = useHistorySkeletonTheme();

  return (
    <View style={styles.content}>
      <View style={styles.statsCard}>
        <Skeleton width={120} height={12} />
        <Skeleton width={140} height={36} />
        <Skeleton width={100} height={12} />
      </View>

      <View style={styles.monthHeader}>
        <Skeleton width={80} height={12} />
      </View>

      {ROWS.map(i => (
        <View key={i} style={styles.card}>
          <Skeleton width={iconSize} height={iconSize} radius="corner-rad-lg" />
          <View style={styles.info}>
            <Skeleton width="70%" height={14} />
            <Skeleton width="40%" height={10} />
          </View>
          <Skeleton width={48} height={14} />
        </View>
      ))}
    </View>
  );
};
