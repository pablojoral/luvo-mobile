import Ionicon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor, FontSize } from 'theme/types/Theme';

export type IconName =
  | 'qr-code'
  | 'qr-code-outline'
  | 'shirt'
  | 'shirt-outline'
  | 'time'
  | 'time-outline'
  | 'information-circle'
  | 'information-circle-outline'
  | 'person'
  | 'person-outline'
  | 'eye-outline'
  | 'eye-off-outline';

interface IconProps {
  name: IconName;
  size?: FontSize;
  color?: FontColor;
}

export const Icon = ({ name, size = 'font-size-md', color = 'font-primary' }: IconProps) => {
  const theme = useTheme();
  return <Ionicon name={name} size={theme.fontSize[size]} color={theme.fontColor[color]} />;
};
