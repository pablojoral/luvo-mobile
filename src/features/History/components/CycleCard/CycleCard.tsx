import { SvgIcon, Text } from '@luvo/ui';
import { View } from 'react-native';
import type { HistoryItem } from 'services/api/services/HistoryService';

import { useCycleCard } from './hooks/useCycleCard';
import { useCycleCardTheme } from './theme/useCycleCardTheme';

interface CycleCardProps {
  item: HistoryItem;
}

export const CycleCard = ({ item }: CycleCardProps) => {
  const { icon, formattedAmount, subtitle, machineName, machineType } = useCycleCard({ item });
  const { styles, iconBoxStyle } = useCycleCardTheme(machineType);

  return (
    <View style={styles.card}>
      <View style={iconBoxStyle}>
        <SvgIcon name={icon} size="icon-size-md" color="font-primary" />
      </View>

      <View style={styles.info}>
        <Text fontSize="font-size-md" fontWeight="semibold">{machineName}</Text>
        <Text fontSize="font-size-xs" color="font-placeholder">{subtitle}</Text>
      </View>

      <Text fontSize="font-size-md" fontWeight="semibold">{formattedAmount}</Text>
    </View>
  );
};
