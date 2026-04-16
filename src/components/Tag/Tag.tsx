import { Text, TextProps } from 'components/Text/Text';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BorderColor, SurfaceColor } from 'theme/types/Theme';

import { useTagTheme } from './theme/useTagTheme';

interface TagProps extends TextProps {
  surfaceColor?: SurfaceColor;
  borderColor?: BorderColor;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Tag = ({
  style,
  surfaceColor = 'surface-background',
  borderColor = 'border-transparent',
  fullWidth = false,
  disabled = false,
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
      <Text {...props} />
    </View>
  );
};
