import { AvailabilityTag } from 'components/AvailabilityTag/AvailabilityTag';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { Machine } from 'models/models';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useMachineCard } from './hooks/useMachineCard';
import { useMachineCardTheme } from './theme/useMachineCardTheme';

interface MachineCardProps {
  machine: Machine;
  onPress?: () => void;
}

export const MachineCard = ({ machine, onPress }: MachineCardProps) => {
  const { styles } = useMachineCardTheme();
  const { iconName, remainingTime, showTimer, chevronColor } = useMachineCard(machine, onPress);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        disabled={!onPress}
      >
        <View style={styles.contentContainer}>
          <SvgIcon name={iconName} size={'icon-size-xxxl'} />
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
              {showTimer && (
                <View style={styles.timerContainer}>
                  <SvgIcon name={'Clock'} size={'icon-size-xs'} color={'font-light'} />
                  <Text fontSize={'font-size-sm'} color={'font-light'}>
                    {remainingTime}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <SvgIcon name={'ChevronRight'} size={'icon-size-xxl'} color={chevronColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};
