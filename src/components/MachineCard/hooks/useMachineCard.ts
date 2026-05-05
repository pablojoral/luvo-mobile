import { Machine } from 'models/models';
import { IconName } from 'components/SvgIcon/types';
import { FontColor } from 'theme/types/Theme';
import { formatMMSS } from 'utils/formatTime';

export const useMachineCard = (machine: Machine, onPress?: () => void) => {
  const iconName: IconName = machine.type === 'dryer' ? 'Wind' : 'Droplet';
  const inUse = machine.status === 'in_use';
  const cycleSeconds = machine.cycleRemainingSeconds;
  const remainingTime = cycleSeconds != null ? formatMMSS(cycleSeconds) : '--:--';
  const showTimer = inUse && cycleSeconds != null;
  const chevronColor: FontColor = onPress ? 'font-primary' : 'font-disabled';

  return { iconName, remainingTime, showTimer, chevronColor };
};
