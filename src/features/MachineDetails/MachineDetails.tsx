import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { AvailabilityTag } from 'components/AvailabilityTag/AvailabilityTag';
import { Button } from 'components/Button/Button';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { TimeTag } from 'components/TimeTag/TimeTag';
import { ScrollView, View } from 'react-native';
import { useMachineDetailsTheme } from './theme/useMachineDetailsTheme';
import { useMachineDetailsScreen } from './hooks/useMachineDetailsScreen';

export const MachineDetails = () => {
  const {
    machine,
    laundry,
    isConnecting,
    statusSurfaceColor,
    showPay,
    showNotify,
    cycleSeconds,
    typeLabel,
    screenTitle,
    notFoundText,
    goBackLabel,
    startWashLabel,
    notifyLabel,
    reportProblemLabel,
    handleGoBack,
    handleStartWash,
    handleNotify,
    handleReport,
  } = useMachineDetailsScreen();
  const { styles, heroCardBg } = useMachineDetailsTheme(statusSurfaceColor);

  if (!machine && isConnecting) {
    return (
      <View style={styles.container}>
        <SafeScreenHeader title={screenTitle} onBack={handleGoBack} />
        <View style={styles.notFound}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (!machine) {
    return (
      <View style={styles.container}>
        <SafeScreenHeader title={screenTitle} onBack={handleGoBack} />
        <View style={styles.notFound}>
          <Text fontSize="font-size-md" color="font-placeholder" style={styles.notFoundText}>
            {notFoundText}
          </Text>
          <Button label={goBackLabel} onPress={handleGoBack} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={machine.name} subtitle={laundry?.name} onBack={handleGoBack} />

      <View style={styles.body}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} bounces={false}>
          <View style={[styles.heroCard, heroCardBg]}>
            <SvgImage name="avatar-washing-machine" height={160} width={160} />
            <Text fontSize="font-size-md" color="font-secondary">
              {typeLabel} · 10 Kgs
            </Text>
            <AvailabilityTag status={machine.status} />
            {showNotify && <TimeTag seconds={cycleSeconds} extended />}
          </View>

          <View style={styles.actions}>
            {showNotify && (
              <Button
                label={notifyLabel}
                variant="tertiary"
                iconName="Bell"
                alignLeft
                fullWidth
                onPress={handleNotify}
              />
            )}
            {showPay && (
              <Button label={startWashLabel} iconName="CreditCard" alignLeft fullWidth onPress={handleStartWash} />
            )}
            <Button
              label={reportProblemLabel}
              variant="tertiary"
              iconName="AlertTriangle"
              alignLeft
              fullWidth
              onPress={handleReport}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
