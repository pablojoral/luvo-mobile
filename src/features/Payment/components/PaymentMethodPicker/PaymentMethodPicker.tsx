import { Button, ProgramSelector, Text } from '@luvo/ui';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { View } from 'react-native';

import type { usePaymentScreen } from '../../hooks/usePaymentScreen';
import { PaymentMethodCard } from '../PaymentMethodCard/PaymentMethodCard';
import { usePaymentMethodPickerTheme } from './theme/usePaymentMethodPickerTheme';

type ScreenData = ReturnType<typeof usePaymentScreen>;

interface PaymentMethodPickerProps {
  programOptions: ScreenData['programOptions'];
  selectedProgramId: ScreenData['selectedProgramId'];
  selectProgramById: ScreenData['selectProgramById'];
  selectedProgram: ScreenData['selectedProgram'];
  strategies: ScreenData['strategies'];
  selectedStrategy: ScreenData['selectedStrategy'];
  setSelectedStrategy: ScreenData['setSelectedStrategy'];
  programPickerLabel: string;
  methodPickerLabel: string;
  confirmLabel: string;
  onConfirm: () => void;
}

export const PaymentMethodPicker = ({
  programOptions,
  selectedProgramId,
  selectProgramById,
  selectedProgram,
  strategies,
  selectedStrategy,
  setSelectedStrategy,
  programPickerLabel,
  methodPickerLabel,
  confirmLabel,
  onConfirm,
}: PaymentMethodPickerProps) => {
  const { styles } = usePaymentMethodPickerTheme();

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <Text fontSize={'font-size-md'} fontWeight={'semibold'}>
        {programPickerLabel}
      </Text>

      <ProgramSelector options={programOptions} value={selectedProgramId} onChange={selectProgramById} />

      <Text fontSize={'font-size-md'} fontWeight={'semibold'}>
        {methodPickerLabel}
      </Text>

      {strategies.map(strategy => (
        <PaymentMethodCard
          key={strategy.id}
          strategy={strategy}
          selected={selectedStrategy.id === strategy.id}
          onSelect={() => setSelectedStrategy(strategy)}
        />
      ))}

      <View style={styles.confirmWrap}>
        <Button
          label={confirmLabel}
          variant="primary"
          size="md"
          iconName="CreditCard"
          alignLeft
          fullWidth
          disabled={!selectedProgram || !selectedStrategy.isAvailable}
          onPress={onConfirm}
        />
      </View>
    </Animated.View>
  );
};
