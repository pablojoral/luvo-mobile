import { useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { CURVE_HEIGHT, useProfileHeaderCurveTheme } from './theme/useProfileHeaderCurveTheme';

// The SVG draws a white rectangle that fills the top portion, then curves
// downward into the lavender body. The quadratic bezier control point sits at
// the horizontal midpoint so the arc is symmetric.
export const ProfileHeaderCurve = () => {
  const { styles, fillColor } = useProfileHeaderCurveTheme();
  const { width } = useWindowDimensions();

  const d = `M0,0 L${width},0 L${width},${CURVE_HEIGHT * 0.6} Q${width / 2},${CURVE_HEIGHT * 1.4} 0,${CURVE_HEIGHT * 0.6} Z`;

  return (
    <View
      style={styles.container}
      accessible={false}
      importantForAccessibility="no"
    >
      <Svg
        width={width}
        height={CURVE_HEIGHT}
        accessibilityElementsHidden
      >
        <Path d={d} fill={fillColor} />
      </Svg>
    </View>
  );
};
