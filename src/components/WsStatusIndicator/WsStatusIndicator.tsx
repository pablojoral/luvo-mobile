import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { WsConnectionState } from 'stores/useLaundriesStore';

import { useWsStatusIndicator } from './hooks/useWsStatusIndicator';
import { useWsStatusIndicatorTheme } from './theme/useWsStatusIndicatorTheme';

interface WsStatusIndicatorProps {
  state: WsConnectionState;
}

export const WsStatusIndicator = ({ state }: WsStatusIndicatorProps) => {
  const { styles, dotColorStyle } = useWsStatusIndicatorTheme({ state });
  const { animStyle } = useWsStatusIndicator(state);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, dotColorStyle, animStyle]} />
      <Text fontSize="font-size-sm">{state}</Text>
    </View>
  );
};
