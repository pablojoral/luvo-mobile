import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { FontColor, FontSize, FontWeight, LineHeight, TextAlign } from 'theme/types/Theme';

import { useTextTheme } from './theme/useTextTheme';

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  fontSize?: FontSize;
  color?: FontColor;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
  textAlign?: TextAlign;
  style?: RNTextProps['style'];
}

export const Text = (props: TextProps) => {
  const {
    children,
    fontSize = 'font-size-md',
    color = 'font-primary',
    fontWeight = 'regular',
    lineHeight,
    textAlign,
    style,
    ...rest
  } = props;

  const { styles } = useTextTheme({ fontSize, color, fontWeight, lineHeight, textAlign });

  return (
    <RNText {...rest} style={[styles.text, style]}>
      {children}
    </RNText>
  );
};
