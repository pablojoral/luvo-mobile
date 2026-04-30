import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { FontColor, FontSize, FontWeight } from 'theme/types/Theme';

import { useTextTheme } from './theme/useTextTheme';

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  fontSize?: FontSize;
  color?: FontColor;
  fontWeight?: FontWeight;
  style?: RNTextProps['style'];
}

export const Text = (props: TextProps) => {
  const {
    children,
    fontSize = 'font-size-md',
    color = 'font-primary',
    fontWeight = 'regular',
    style,
    ...rest
  } = props;

  const { styles } = useTextTheme({ fontSize, color, fontWeight });

  return (
    <RNText {...rest} style={[styles.text, style]}>
      {children}
    </RNText>
  );
};
