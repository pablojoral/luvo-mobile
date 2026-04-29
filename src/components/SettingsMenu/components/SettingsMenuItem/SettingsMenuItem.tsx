import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useSettingsMenuItemTheme } from './theme/useSettingsMenuItemTheme';

export interface SettingsMenuItemData {
  label: string;
  iconName: IconName;
  onPress: () => void;
  /** Trailing icon shown at the right edge. Pass `null` to hide it. Defaults to `'ChevronRight'`. */
  trailingIcon?: IconName | null;
}

interface SettingsMenuItemProps {
  label: string;
  iconName: IconName;
  onPress: () => void;
  /** Trailing icon shown at the right edge. Pass `null` to hide it. Defaults to `'ChevronRight'`. */
  trailingIcon?: IconName | null;
}

export const SettingsMenuItem = ({ label, iconName, onPress, trailingIcon = 'ChevronRight' }: SettingsMenuItemProps) => {
  const { styles } = useSettingsMenuItemTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityHint="Navigate to section"
      accessibilityRole="button"
    >
      <SvgIcon name={iconName} size={'font-size-xxl'} />
      <Text fontSize={'font-size-xl'} style={styles.label}>
        {label}
      </Text>
      {trailingIcon != null && (
        <SvgIcon name={trailingIcon} size={'font-size-xl'} color={'font-secondary'} />
      )}
    </TouchableOpacity>
  );
};
