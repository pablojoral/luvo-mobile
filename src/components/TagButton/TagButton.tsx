import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { Tag } from 'components/Tag/Tag';
import { TextProps } from 'components/Text/Text';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { BorderColor, SurfaceColor } from 'theme/types/Theme';
import { IconName } from 'components/SvgIcon/types';

interface TagButtonProps extends TextProps {
  onPress: () => void;
  surfaceColor?: SurfaceColor;
  borderColor?: BorderColor;
  // Intentionally a ViewStyle (container), not a TextStyle. @luvo/ui TextProps
  // has no `style` field, so there is no shadowing conflict — this prop is
  // forwarded to <Tag style={...}> which applies it to the wrapping View.
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconName?: IconName;
}

export const TagButton = ({
  onPress,
  loading = false,
  disabled = false,
  iconName,
  ...tagProps
}: TagButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
      <Tag
        {...tagProps}
        disabled={disabled}
        iconName={loading ? undefined : iconName}
      >
        {loading ? <ActivityIndicator size="small" color={tagProps.color} /> : tagProps.children}
      </Tag>
    </TouchableOpacity>
  );
};
