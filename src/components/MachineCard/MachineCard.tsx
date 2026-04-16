import { AvailabilityTag } from 'components/AvailabilityTag/AvailabilityTag';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { Machine } from 'models/models';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useMachineCardTheme } from './theme/useMachineCardTheme';

interface MachineCardProps {
  machine: Machine;
  onPress?: () => void;
}

/** Format seconds as mm:ss */
function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const MachineCard = ({ machine, onPress }: MachineCardProps) => {
  const { styles } = useMachineCardTheme();

  const iconName: IconName = machine.type === 'dryer' ? 'Droplet' : 'Wind';
  const inUse = machine.status === 'in_use';
  const cycleSeconds = (machine as any).cycleRemainingSeconds as number | undefined;
  const remainingTime = cycleSeconds != null ? formatSeconds(cycleSeconds) : '--:--';

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        disabled={!onPress}
      >
        <View style={styles.contentContainer}>
          <SvgIcon name={iconName} size={'font-size-xxxxl'} />
          <View style={styles.infoContainer}>
            <View style={styles.machineInfo}>
              <Text fontSize={'font-size-lg'} fontWeight={'semibold'}>
                {machine.name}
              </Text>
              <Text fontSize={'font-size-sm'} color={'font-light'}>
                10 Kgs
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <AvailabilityTag status={machine.status} />
              {inUse && cycleSeconds != null ? (
                <View style={styles.timerContainer}>
                  <SvgIcon name={'Clock'} size={'font-size-sm'} color={'font-light'} />
                  <Text fontSize={'font-size-sm'} color={'font-light'}>
                    {remainingTime}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <SvgIcon
          name={'ChevronRight'}
          size={'font-size-xxl'}
          color={onPress ? 'font-primary' : 'font-disabled'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
