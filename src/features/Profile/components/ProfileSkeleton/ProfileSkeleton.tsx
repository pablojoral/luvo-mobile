import { Skeleton } from '@luvo/ui';
import { View } from 'react-native';

import { useProfileSkeletonTheme } from './theme/useProfileSkeletonTheme';

const ROW_COUNT = 5;
const ROWS = Array.from({ length: ROW_COUNT }, (_, i) => i);

export const ProfileSkeleton = () => {
  const { styles, avatarSize } = useProfileSkeletonTheme();

  return (
    <>
      <View style={styles.header}>
        <Skeleton width={avatarSize} height={avatarSize} radius="corner-rad-xl" />
        <View style={styles.headerText}>
          <Skeleton width={100} height={16} />
          <Skeleton width={160} height={22} />
        </View>
        <Skeleton width={44} height={46} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.menusContainer}>
          {ROWS.map(i => (
            <View key={i} style={styles.row}>
              <Skeleton width={24} height={24} />
              <Skeleton width="50%" height={14} style={styles.rowLabel} />
              <Skeleton width={16} height={16} />
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
