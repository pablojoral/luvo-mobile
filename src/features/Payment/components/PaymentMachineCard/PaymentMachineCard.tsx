import { AvailabilityTag, SvgIcon, Text } from '@luvo/ui';
import { View } from 'react-native';

import type { Laundry, Machine } from 'models/models';
import type { usePaymentScreen } from '../../hooks/usePaymentScreen';
import { usePaymentMachineCard } from './hooks/usePaymentMachineCard';
import { usePaymentMachineCardTheme } from './theme/usePaymentMachineCardTheme';

type ScreenData = ReturnType<typeof usePaymentScreen>;

interface PaymentMachineCardProps {
  machine: Machine;
  laundry: Laundry | null;
  machineLabel: string;
  availabilityStatus: ScreenData['availabilityStatus'];
  availabilityLabels: ScreenData['strings']['availabilityLabels'];
}

export const PaymentMachineCard = ({
  machine,
  laundry,
  machineLabel,
  availabilityStatus,
  availabilityLabels,
}: PaymentMachineCardProps) => {
  const { styles } = usePaymentMachineCardTheme();
  const { iconName } = usePaymentMachineCard({ machine });

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <SvgIcon name={iconName} size={'icon-size-xxxl'} color={'font-highlight'} />
        <View style={styles.info}>
          <Text fontSize={'font-size-lg'} fontWeight={'semibold'}>
            {machineLabel}
          </Text>
          {laundry ? (
            <Text fontSize={'font-size-sm'} color={'font-light'}>
              {laundry.name}
            </Text>
          ) : null}
        </View>
        <AvailabilityTag status={availabilityStatus} labels={availabilityLabels} />
      </View>
    </View>
  );
};
