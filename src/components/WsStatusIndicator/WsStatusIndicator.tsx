import { Text } from 'components/Text/Text';
import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { WsConnectionState } from 'stores/useLaundriesStore';

import { useWsStatusIndicatorTheme } from './theme/useWsStatusIndicatorTheme';

interface WsStatusIndicatorProps {
  state: WsConnectionState;
}

export const WsStatusIndicator = ({ state }: WsStatusIndicatorProps) => {
  const { styles, dotColorStyle } = useWsStatusIndicatorTheme({ state });

  const pulse = useSharedValue(1);

  React.useEffect(() => {
    if (state === 'connecting' || state === 'reconnecting') {
      pulse.value = withRepeat(withTiming(0.3, { duration: 700 }), -1, true);
    } else {
      pulse.value = withTiming(1, { duration: 200 });
    }
  }, [state, pulse]);

  const animStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, dotColorStyle, animStyle]} />
      <Text fontSize={'font-size-sm'} color={'font-primary'}>
        {state}
      </Text>
    </View>
  );
};
