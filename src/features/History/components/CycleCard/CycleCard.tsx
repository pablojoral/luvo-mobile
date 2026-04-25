import { View } from 'react-native';
import { Text } from 'components/Text/Text';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { useHistoryTheme } from '../../theme/useHistoryTheme';
import type { HistoryItem } from 'services/api/services/HistoryService';
import { useCycleCard } from './hooks/useCycleCard';

interface CycleCardProps {
  item: HistoryItem;
}

export const CycleCard = ({ item }: CycleCardProps) => {
  const { styles } = useHistoryTheme();
  const { icon, formattedAmount, formattedDate, sharedBillingLabel, machineName, laundryName, isShared } =
    useCycleCard({ item });

  return (
    <View style={styles.cycleCard}>
      <View style={styles.cycleIconBox}>
        <SvgIcon name={icon} size="font-size-lg" color="font-secondary" />
      </View>

      <View style={styles.cycleInfo}>
        <Text style={styles.cycleMachine}>{machineName}</Text>
        <Text style={styles.cycleLaundry}>{laundryName}</Text>
        {isShared && <Text style={styles.sharedBadge}>{sharedBillingLabel}</Text>}
      </View>

      <View style={styles.cycleRight}>
        <Text style={styles.cycleAmount}>{formattedAmount}</Text>
        <Text style={styles.cycleDate}>{formattedDate}</Text>
      </View>
    </View>
  );
};
