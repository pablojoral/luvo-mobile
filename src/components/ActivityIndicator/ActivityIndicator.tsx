import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps as RNActivityIndicatorProps } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor } from 'theme/types/Theme';

export interface ActivityIndicatorProps extends Omit<RNActivityIndicatorProps, 'color'> {
  color?: FontColor | RNActivityIndicatorProps['color'];
}

export const ActivityIndicator = ({ color = 'font-primary', ...rest }: ActivityIndicatorProps) => {
  const theme = useTheme();

  const resolvedColor = color in theme.fontColor
    ? theme.fontColor[color as FontColor]
    : color as string;

  return <RNActivityIndicator color={resolvedColor} {...rest} />;
};
