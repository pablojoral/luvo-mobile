/**
 * Payment — full-screen payment flow modal
 *
 * States:
 *   idle    → method picker + confirm button
 *   loading → spinner + progress message
 *   success → success card + done button
 *   error   → error message + retry button
 */

import { Button } from 'components/Button/Button';
import { AvailabilityTag } from 'components/AvailabilityTag/AvailabilityTag';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { usePayment } from './hooks/usePayment';
import { PaymentMethodCard } from './components/PaymentMethodCard/PaymentMethodCard';
import { usePaymentTheme } from './theme/usePaymentTheme';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export const Payment = ({ route, navigation }: Props) => {
  const { machineId } = route.params;
  const { styles } = usePaymentTheme();

  // Derive machine + laundry from live store
  const machine = useLaundriesStore(
    s => s.laundries.flatMap(l => l.machines ?? []).find(m => m.id === machineId) ?? null,
  );
  const laundry = useLaundriesStore(s => s.laundries.find(l => l.machines?.some(m => m.id === machineId)) ?? null);

  const { strategies, selectedStrategy, setSelectedStrategy, paymentState, progressMsg, result, execute, reset } =
    usePayment(machineId);

  const isLoading = paymentState === 'loading';
  const isSuccess = paymentState === 'success';
  const isError = paymentState === 'error';

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Pagar máquina" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Machine info card */}
        {machine ? (
          <View style={styles.machineCard}>
            <View style={styles.machineRow}>
              <SvgIcon
                name={machine.type === 'dryer' ? 'Droplet' : 'Wind'}
                size={'font-size-xxxxl'}
                color={'font-highlight'}
              />
              <View style={styles.machineInfo}>
                <Text fontSize={'font-size-lg'} fontWeight={'semibold'}>
                  {machine.name}
                </Text>
                {laundry ? (
                  <Text fontSize={'font-size-sm'} color={'font-light'}>
                    {laundry.name}
                  </Text>
                ) : null}
              </View>
              <AvailabilityTag status={machine.status} />
            </View>
          </View>
        ) : null}

        {/* ── Idle / method picker ───────────────────────────────────────── */}
        {paymentState === 'idle' && (
          <Animated.View style={styles.idleContent} entering={FadeIn} exiting={FadeOut}>
            <Text fontSize={'font-size-md'} fontWeight={'semibold'}>
              Método de pago
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
                label="Confirmar pago"
                variant="primary"
                size="xl"
                fullWidth
                disabled={!selectedStrategy.isAvailable}
                onPress={execute}
              />
            </View>
          </Animated.View>
        )}

        {/* ── Loading ────────────────────────────────────────────────────── */}
        {isLoading && (
          <Animated.View style={styles.centeredState} entering={FadeIn} exiting={FadeOut}>
            <ActivityIndicator size="large" />
            <Text fontSize={'font-size-md'} color={'font-secondary'} style={styles.statusMsg}>
              {progressMsg || 'Procesando pago…'}
            </Text>
          </Animated.View>
        )}

        {/* ── Success ───────────────────────────────────────────────────── */}
        {isSuccess && (
          <Animated.View style={styles.centeredState} entering={FadeIn} exiting={FadeOut}>
            <View style={[styles.resultIcon, styles.resultIconSuccess]}>
              <SvgIcon name={'Star'} size={'font-size-xxxxl'} color={'font-success'} />
            </View>
            <Text fontSize={'font-size-xl'} fontWeight={'semibold'} style={styles.statusMsg}>
              ¡Máquina activada!
            </Text>
            <Text fontSize={'font-size-sm'} color={'font-light'} style={styles.statusSub}>
              La máquina comenzará en breve.
            </Text>
            <Button
              label="Listo"
              variant="primary"
              size="xl"
              fullWidth
              style={styles.actionButton}
              onPress={() => navigation.goBack()}
            />
          </Animated.View>
        )}

        {/* ── Error ─────────────────────────────────────────────────────── */}
        {isError && (
          <Animated.View style={styles.centeredState} entering={FadeIn} exiting={FadeOut}>
            <View style={[styles.resultIcon, styles.resultIconError]}>
              <SvgIcon name={'AlertCircle'} size={'font-size-xxxxl'} color={'font-error'} />
            </View>
            <Text fontSize={'font-size-xl'} fontWeight={'semibold'} style={styles.statusMsg}>
              Pago fallido
            </Text>
            <Text fontSize={'font-size-sm'} color={'font-light'} style={styles.statusSub}>
              {result?.error ?? 'Algo salió mal. Intenta nuevamente.'}
            </Text>
            <Button
              label="Reintentar"
              variant="primary"
              size="xl"
              fullWidth
              style={styles.actionButton}
              onPress={reset}
            />
            <Button label="Cancelar" variant="tertiary" size="md" fullWidth onPress={() => navigation.goBack()} />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};
