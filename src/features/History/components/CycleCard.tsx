import { View } from 'react-native';
import { Text } from 'components/Text/Text';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { useHistoryTheme } from '../theme/useHistoryTheme';
import type { HistoryItem } from 'services/api/services/HistoryService';

function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null || currency === null) return 'Gratis';
  try {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount} ${currency}`;
  }
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' });
}

export const CycleCard = ({ item }: { item: HistoryItem }) => {
  const { styles } = useHistoryTheme();
  const icon = item.machineType === 'washing_machine' ? 'Droplet' : 'Wind';

  return (
    <View style={styles.cycleCard}>
      <View style={styles.cycleIconBox}>
        <SvgIcon name={icon} size="font-size-lg" color="font-secondary" />
      </View>

      <View style={styles.cycleInfo}>
        <Text style={styles.cycleMachine}>{item.machineName}</Text>
        <Text style={styles.cycleLaundry}>{item.laundryName}</Text>
        {item.isShared && <Text style={styles.sharedBadge}>Facturación compartida</Text>}
      </View>

      <View style={styles.cycleRight}>
        <Text style={styles.cycleAmount}>
          {formatAmount(item.amount, item.currency)}
        </Text>
        <Text style={styles.cycleDate}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  );
};
