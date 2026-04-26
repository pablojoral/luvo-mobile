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
import { PaymentMethodCard } from './components/PaymentMethodCard/PaymentMethodCard';
import { usePaymentTheme } from './theme/usePaymentTheme';
import { usePaymentScreen } from './hooks/usePaymentScreen';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';

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
    paymentState,
    progressMsg,
    errorMsg,
    execute,
    reset,
    isLoading,
    isSuccess,
    isError,
    strings,
  } = usePaymentScreen({ machineId });

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title={strings.title} onBack={() => navigation.goBack()} />

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
              {strings.methodPicker}
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
                label={strings.confirm}
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
              {progressMsg || strings.processing}
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
              {strings.successTitle}
            </Text>
            <Text fontSize={'font-size-sm'} color={'font-light'} style={styles.statusSub}>
              {strings.successSubtitle}
            </Text>
            <Button
              label={strings.done}
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
              {strings.errorTitle}
            </Text>
            <Text fontSize={'font-size-sm'} color={'font-light'} style={styles.statusSub}>
              {errorMsg}
            </Text>
            <Button
              label={strings.retry}
              variant="primary"
              size="xl"
              fullWidth
              style={styles.actionButton}
              onPress={reset}
            />
            <Button label={strings.cancel} variant="tertiary" size="md" fullWidth onPress={() => navigation.goBack()} />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};
