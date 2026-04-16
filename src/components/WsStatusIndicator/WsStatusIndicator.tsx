import { Text } from 'components/Text/Text';
import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { WsConnectionState } from 'stores/useLaundriesStore';
import { Colors } from 'theme/constants/colors';

import { useWsStatusIndicatorTheme } from './theme/useWsStatusIndicatorTheme';

const colorMap: Record<WsConnectionState, string> = {
  idle: Colors['colors-grey-300'],
  connecting: Colors['colors-yellow-500'],
  connected: Colors['colors-green-500'],
  reconnecting: Colors['colors-yellow-500'],
  error: Colors['colors-red-500'],
};

interface WsStatusDotProps {
  state: WsConnectionState;
}

export const WsStatusIndicator = ({ state }: WsStatusDotProps) => {
  const { styles } = useWsStatusIndicatorTheme();

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
      <Animated.View style={[styles.dot, { backgroundColor: colorMap[state] }, animStyle]} />
      <Text fontSize={'font-size-sm'} color={'font-primary'}>
        {state}
      </Text>
    </View>
  );
};
