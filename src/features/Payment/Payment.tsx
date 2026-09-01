/**
 * Payment — full-screen payment flow modal
 *
 * States:
 *   idle    → method picker + confirm button
 *   loading → spinner + progress message
 *   success → success card + done button
 *   error   → error message + retry button
 */

import { ScreenHeader } from '@luvo/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';

import { RootStackParamList } from 'navigation/RootStackNavigator';
import { PaymentMachineCard } from './components/PaymentMachineCard/PaymentMachineCard';
import { PaymentMethodPicker } from './components/PaymentMethodPicker/PaymentMethodPicker';
import { PaymentLoadingState } from './components/PaymentLoadingState/PaymentLoadingState';
import { PaymentResultState } from './components/PaymentResultState/PaymentResultState';
import { usePaymentTheme } from './theme/usePaymentTheme';
import { usePaymentScreen } from './hooks/usePaymentScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export const Payment = ({ route, navigation }: Props) => {
  const { machineId } = route.params;
  const { styles } = usePaymentTheme();

  const {
    machine,
    laundry,
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    selectedProgram,
    programOptions,
    selectedProgramId,
    selectProgramById,
    paymentState,
    execute,
    reset,
    isLoading,
    isSuccess,
    isError,
    availabilityStatus,
    machineLabel,
    strings,
  } = usePaymentScreen({ machineId });

  return (
    <View style={styles.container}>
      <ScreenHeader title={strings.title} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {machine ? (
          <PaymentMachineCard
            machine={machine}
            laundry={laundry}
            machineLabel={machineLabel}
            availabilityStatus={availabilityStatus}
            availabilityLabels={strings.availabilityLabels}
          />
        ) : null}

        {paymentState === 'idle' && (
          <PaymentMethodPicker
            programOptions={programOptions}
            selectedProgramId={selectedProgramId}
            selectProgramById={selectProgramById}
            selectedProgram={selectedProgram}
            strategies={strategies}
            selectedStrategy={selectedStrategy}
            setSelectedStrategy={setSelectedStrategy}
            programPickerLabel={strings.programPicker}
            methodPickerLabel={strings.methodPicker}
            confirmLabel={strings.confirm}
            onConfirm={execute}
          />
        )}

        {isLoading && <PaymentLoadingState message={strings.progressMsg || strings.processing} />}

        {isSuccess && (
          <PaymentResultState
            variant="success"
            title={strings.successTitle}
            subtitle={strings.successSubtitle}
            primaryLabel={strings.done}
            onPrimary={() => navigation.goBack()}
          />
        )}

        {isError && (
          <PaymentResultState
            variant="error"
            title={strings.errorTitle}
            subtitle={strings.errorMsg}
            primaryLabel={strings.retry}
            onPrimary={reset}
            secondaryLabel={strings.cancel}
            onSecondary={() => navigation.goBack()}
          />
        )}
      </ScrollView>
    </View>
  );
};
