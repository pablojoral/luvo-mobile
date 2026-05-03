import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCheck = (props: SvgProps) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 6 9 17l-5-5"
    />
  </Svg>
);
export default SvgCheck;
