import React from 'react';
import { View } from 'react-native';

import { useLaundriesStore } from 'stores/useLaundriesStore';
import { WsStatusDot } from '../../../components/WsStatusIndicator/WsStatusIndicator';
import { useLaundriesTheme } from '../theme/useLaundriesTheme';

export const useWsOverlay = () => {
  const { styles } = useLaundriesTheme();
  const connectionState = useLaundriesStore(s => s.connectionState);

  const overlay = (
    <View style={styles.wsOverlay} pointerEvents="none">
      <WsStatusDot state={connectionState} />
    </View>
  );

  return { overlay };
};
