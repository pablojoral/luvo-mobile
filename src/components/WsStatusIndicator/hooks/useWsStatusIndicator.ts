import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { WsConnectionState } from 'stores/useLaundriesStore';

export const useWsStatusIndicator = (state: WsConnectionState) => {
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (state === 'connecting' || state === 'reconnecting') {
      pulse.value = withRepeat(withTiming(0.3, { duration: 700 }), -1, true);
    } else {
      pulse.value = withTiming(1, { duration: 200 });
    }
  }, [state, pulse]);

  const animStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return { animStyle };
};
