import { Text } from 'components/Text/Text';
import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { SurfaceColor } from 'theme/types/Theme';

import { useAnimatedStyles } from './hooks/useAnimatedStyles';
import { usePillSelectorTheme } from './theme/usePillSelectorTheme';

export type SelectorOption = { label: string; value: string };

interface PillSelectorProps extends ViewProps {
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
  backgroundColor?: SurfaceColor;
  thumbColor?: SurfaceColor;
  fontSize?: number;
}

export const PillSelector = ({
  options,
  value,
  onChange,
  backgroundColor = 'surface-primary',
  thumbColor = 'surface-invert',
  ...props
}: PillSelectorProps) => {
  const { styles } = usePillSelectorTheme({ backgroundColor, thumbColor });
  const { thumbStyle, segmentWidthStyle, onLayout, handlePress } = useAnimatedStyles({
    options,
    value,
    onChange,
  });
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container} onLayout={onLayout} {...props}>
        {/* Thumb */}
        <Animated.View style={[styles.thumb, thumbStyle, segmentWidthStyle]} />

        {/* Segments */}
        <View style={styles.row}>
          {options.map((o, i) => (
            <Pressable key={o.value} style={[styles.segment, segmentWidthStyle]} onPress={() => handlePress(i)}>
              <Text fontSize={'font-size-sm'} fontWeight={'medium'}>{o.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};
