import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { StyleProp, View, ViewStyle } from 'react-native';
import type { FontColor, FontSize, IconSize } from 'theme/types/Theme';
import { useLabelTheme } from './theme/useLabelTheme';

interface LabelProps {
  iconName: IconName;
  iconSize?: IconSize;
  color?: FontColor;
  fontSize?: FontSize;
  numberOfLines?: number;
  children: string;
  style?: StyleProp<ViewStyle>;
}

export const Label = ({
  iconName,
  iconSize = 'icon-size-sm',
  color = 'font-primary',
  fontSize = 'font-size-sm',
  numberOfLines,
  children,
  style,
}: LabelProps) => {
  const { styles } = useLabelTheme();

  return (
    <View style={[styles.container, style]}>
      <SvgIcon name={iconName} size={iconSize} color={color} />
      <Text fontSize={fontSize} color={color} style={styles.text} numberOfLines={numberOfLines}>
        {children}
      </Text>
    </View>
  );
};
