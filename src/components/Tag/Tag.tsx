import { Text, TextProps } from 'components/Text/Text';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BorderColor, IconSize, SurfaceColor } from 'theme/types/Theme';

import { useTagTheme } from './theme/useTagTheme';
import { IconName } from 'components/SvgIcon/types';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';

interface TagProps extends TextProps {
  surfaceColor?: SurfaceColor;
  borderColor?: BorderColor;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  iconName?: IconName;
  iconSize?: IconSize;
}

export const Tag = ({
  style,
  surfaceColor = 'surface-background',
  borderColor = 'border-transparent',
  fullWidth = false,
  disabled = false,
  iconName,
  iconSize = 'icon-size-xs',
  ...props
}: TagProps) => {
  const { containerStyle } = useTagTheme({
    surfaceColor,
    borderColor,
    fullWidth,
    disabled,
  });

  return (
    <View style={[containerStyle, style]}>
      {iconName ? <SvgIcon name={iconName} size={iconSize} color={props.color} /> : null}
      {props.children ? <Text {...props} /> : null}
    </View>
  );
};
