import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { Text } from 'components/Text/Text';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { ButtonSize } from 'theme/types/Theme';

import { fontSizeMap, fontWeightMap, textColorMap } from './theme/constants';
import { useButtonTheme } from './theme/useButtonTheme';
import { Icon, IconName } from 'components/Icon/Icon';

type ButtonVaraint = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  variant?: ButtonVaraint;
  size?: ButtonSize;
  iconName?: IconName;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  submitting?: boolean;
  stale?: boolean;
  rounded?: boolean;
}

export const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  iconName,
  onPress,
  style,
  fullWidth,
  disabled,
  submitting,
  stale,
  rounded,
  ...props
}: ButtonProps) => {
  const { containerStyle, contentContainerStyle } = useButtonTheme({
    variant,
    size,
    fullWidth,
    rounded,
  });

  return (
    <TouchableOpacity disabled={disabled || stale || submitting} onPress={onPress} style={[containerStyle, style]}>
      <View style={contentContainerStyle} {...props}>
        {submitting ? (
          <ActivityIndicator color={textColorMap[variant]} size="small" />
        ) : (
          <>
            {iconName ? <Icon name={iconName} size={fontSizeMap[size]} color={textColorMap[variant]} /> : null}
            {label ? (
              <Text fontSize={fontSizeMap[size]} color={textColorMap[variant]} fontWeight={fontWeightMap[size]}>
                {label}
              </Text>
            ) : null}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
