import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity, View } from 'react-native';

import { PaymentStrategy } from '../../strategies/PaymentStrategy';
import { usePaymentMethodCardTheme } from './theme/usePaymentMethodCardTheme';
import { usePaymentMethodCard } from './hooks/usePaymentMethodCard';

interface PaymentMethodCardProps {
  strategy: PaymentStrategy;
  selected: boolean;
  onSelect: () => void;
}

export const PaymentMethodCard = ({ strategy, selected, onSelect }: PaymentMethodCardProps) => {
  const { styles, cardStyle } = usePaymentMethodCardTheme({
    selected,
    isAvailable: strategy.isAvailable,
  });
  const { label, description } = usePaymentMethodCard({ strategy });

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={onSelect}
      disabled={!strategy.isAvailable}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <SvgIcon name={strategy.icon} size={'icon-size-md'} color={'font-highlight'} />
        </View>
        <View style={styles.textWrap}>
          <Text fontSize={'font-size-md'} fontWeight={'semibold'}>
            {label}
          </Text>
          <Text fontSize={'font-size-sm'} color={'font-light'}>
            {description}
          </Text>
        </View>
        {selected && strategy.isAvailable ? (
          <View style={styles.check}>
            <SvgIcon name={'Info'} size={'icon-size-xs'} color={'font-invert'} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
