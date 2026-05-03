import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { FontColor, IconSize, SurfaceColor } from 'theme/types/Theme';

import { useIconButtonTheme } from './theme/useIconButtonTheme';

export interface IconButtonProps extends TouchableOpacityProps {
  iconName: IconName;
  iconSize?: IconSize;
  iconColor?: FontColor;
  surfaceColor?: SurfaceColor;
}

export const IconButton = ({
  iconName,
  iconSize = 'icon-size-xl',
  iconColor = 'font-primary',
  surfaceColor = 'surface-button',
  style,
  ...props
}: IconButtonProps) => {
  const { containerStyle } = useIconButtonTheme({ iconSize, surfaceColor });

  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={[containerStyle, style]}>
      <SvgIcon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};
