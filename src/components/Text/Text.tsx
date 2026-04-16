import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { FontColor, FontSize, FontWeight, LineHeight } from 'theme/types/Theme';

import { useTextTheme } from './theme/useTextTheme';

export interface TextProps extends RNTextProps {
  children: React.ReactNode;
  fontSize?: FontSize;
  color?: FontColor;
  lineHeight?: LineHeight;
  fontWeight?: FontWeight;
  style?: RNTextProps['style'];
}

export const Text = (props: TextProps) => {
  const {
    children,
    fontSize = 'font-size-md',
    color = 'font-primary',
    // lineHeight = 'line-height-md',
    fontWeight = 'regular',
    style,
    ...rest
  } = props;

  const { styles } = useTextTheme({
    fontSize,
    color,
    // lineHeight,
    fontWeight,
  });

  return (
    <RNText {...rest} style={[styles.text, style]}>
      {children}
    </RNText>
  );
};
