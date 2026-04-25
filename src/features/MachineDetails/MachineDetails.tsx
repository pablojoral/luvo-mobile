import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Tag } from 'components/Tag/Tag';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { useMachineDetailsTheme } from './theme/useMachineDetailsTheme';
import { useMachineDetailsScreen } from './hooks/useMachineDetailsScreen';

export const MachineDetails = () => {
  const { styles } = useMachineDetailsTheme();
  const {
    machine,
    laundry,
    isConnecting,
    statusStyle,
    isAvailable,
    typeLabel,
    statusLabel,
    iconName,
    screenTitle,
    notFoundText,
    goBackLabel,
    modelLabel,
    startWashLabel,
    reportProblemLabel,
    handleGoBack,
    handleStartWash,
    handleReport,
  } = useMachineDetailsScreen();

  // WS is still connecting — data may not be loaded yet
  if (!machine && isConnecting) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={screenTitle} onBack={handleGoBack} />
        <View style={styles.notFound}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (!machine || !laundry) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={screenTitle} onBack={handleGoBack} />
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
      <ScreenHeader title={laundry.name} onBack={handleGoBack} />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <SvgIcon
              name={iconName}
              size="font-size-xl"
              color="font-secondary"
            />
            <Text fontSize="font-size-lg" fontWeight="semibold" color="font-primary">
              {machine.name}
            </Text>
          </View>

          <View style={styles.row}>
            <Text fontSize="font-size-sm" color="font-placeholder">
              {typeLabel}
            </Text>
            {statusStyle ? (
              <Tag
                fontSize="font-size-xs"
                color={statusStyle.color}
                surfaceColor={statusStyle.surfaceColor}
              >
                {statusLabel}
              </Tag>
            ) : null}
          </View>

          {machine.modelNumber ? (
            <Text fontSize="font-size-xs" color="font-placeholder">
              {modelLabel}: {machine.modelNumber}
            </Text>
          ) : null}
        </View>

        <View style={styles.actions}>
          <Button
            label={startWashLabel}
            fullWidth
            disabled={!isAvailable}
            onPress={handleStartWash}
          />
          <Button
            label={reportProblemLabel}
            variant="tertiary"
            fullWidth
            onPress={handleReport}
          />
        </View>
      </View>
    </View>
  );
};
