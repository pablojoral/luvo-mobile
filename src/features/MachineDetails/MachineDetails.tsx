import { RouteProp, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Tag } from 'components/Tag/Tag';
import { Text } from 'components/Text/Text';
import { MachineStatus, MachineType } from 'models/models';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import React from 'react';
import { View } from 'react-native';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useMachineDetailsTheme } from './theme/useMachineDetailsTheme';

const TYPE_LABEL: Record<MachineType, string> = {
  washing_machine: 'Lavadora',
  dryer: 'Secadora',
};

const STATUS_LABEL: Record<MachineStatus, string> = {
  available: 'Disponible',
  in_use: 'En uso',
  out_of_order: 'Fuera de servicio',
  maintenance: 'Mantenimiento',
};

const STATUS_COLOR: Record<MachineStatus, { color: Parameters<typeof Tag>[0]['color']; surfaceColor: Parameters<typeof Tag>[0]['surfaceColor'] }> = {
  available:    { color: 'font-success',   surfaceColor: 'surface-success' },
  in_use:       { color: 'font-warning',   surfaceColor: 'surface-warning' },
  out_of_order: { color: 'font-error',     surfaceColor: 'surface-error' },
  maintenance:  { color: 'font-warning',   surfaceColor: 'surface-warning' },
};

export const MachineDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MachineDetails'>>();
  const navigation = useRootStackNavigation();
  const { machineId } = route.params;
  const { styles } = useMachineDetailsTheme();

  const connectionState = useLaundriesStore(s => s.connectionState);
  const machine = useLaundriesStore(s => {
    for (const l of s.laundries) {
      const m = l.machines?.find(m => m.id === machineId);
      if (m) return m;
    }
    return null;
  });
  const laundry = useLaundriesStore(s =>
    s.laundries.find(l => l.id === machine?.laundryId) ?? null,
  );

  // WS is still connecting — data may not be loaded yet
  if (!machine && (connectionState === 'idle' || connectionState === 'connecting')) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Máquina" onBack={() => navigation.goBack()} />
        <View style={styles.notFound}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (!machine || !laundry) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Máquina" onBack={() => navigation.goBack()} />
        <View style={styles.notFound}>
          <Text fontSize="font-size-md" color="font-placeholder" style={{ textAlign: 'center' }}>
            No se encontró información para esta máquina.
          </Text>
          <Button label="Volver" onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }

  const statusStyle = STATUS_COLOR[machine.status];
  const isAvailable = machine.status === 'available';

  return (
    <View style={styles.container}>
      <ScreenHeader title={laundry.name} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <SvgIcon
              name={machine.type === 'dryer' ? 'Wind' : 'Droplet'}
              size="font-size-xl"
              color="font-secondary"
            />
            <Text fontSize="font-size-lg" fontWeight="semibold" color="font-primary">
              {machine.name}
            </Text>
          </View>

          <View style={styles.row}>
            <Text fontSize="font-size-sm" color="font-placeholder">
              {TYPE_LABEL[machine.type]}
            </Text>
            <Tag
              fontSize="font-size-xs"
              color={statusStyle.color}
              surfaceColor={statusStyle.surfaceColor}
            >
              {STATUS_LABEL[machine.status]}
            </Tag>
          </View>

          {machine.modelNumber ? (
            <Text fontSize="font-size-xs" color="font-placeholder">
              Modelo: {machine.modelNumber}
            </Text>
          ) : null}
        </View>

        <View style={styles.actions}>
          <Button
            label="Iniciar lavado"
            fullWidth
            disabled={!isAvailable}
            onPress={() => navigation.navigate('Payment', { machineId: machine.id })}
          />
          <Button
            label="Reportar problema"
            variant="tertiary"
            fullWidth
            onPress={() => navigation.navigate('Report', { laundryId: laundry.id, machineId: machine.id })}
          />
        </View>
      </View>
    </View>
  );
};
