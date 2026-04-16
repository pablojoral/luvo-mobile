import { SvgImage } from 'components/SvgImage/SvgImage';
import { StyleSheet } from 'react-native';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { useTheme } from 'theme/hooks/useTheme';

import { buildFillPath, getFillColor, PIN_PATH, VIEWBOX_SIZE } from '../utils/pinUtils';

interface PinSvgProps {
  /** 0–1 fill ratio */
  ratio: number;
  size: number;
}

export const PinSvg = ({ ratio, size }: PinSvgProps) => {
  const theme = useTheme();
  const fillColor = getFillColor(ratio);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}>
      <Defs>
        <ClipPath id="pinClip">
          <Path d={PIN_PATH} />
        </ClipPath>
      </Defs>

      {/* Layer 1 — base fill */}
      <Path d={PIN_PATH} fill={theme.surfaceColor['surface-primary']} />

      {/* Layer 2 — color fill with wavy top edge, clipped to pin shape */}
      <G clipPath="url(#pinClip)">
        <Path d={buildFillPath(ratio, VIEWBOX_SIZE)} fill={fillColor} />
      </G>

      {/* Layer 3 — border on top of everything */}
      <Path
        d={PIN_PATH}
        fill="none"
        stroke={theme.borderColor?.['border-primary']}
        strokeWidth={1}
      />

      <SvgImage
        name={'luvo-logo-pink'}
        style={styles.logo}
        transform={`translate(0, 8)`}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
