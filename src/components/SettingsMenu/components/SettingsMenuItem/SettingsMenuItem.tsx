import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useSettingsMenuItemTheme } from './theme/useSettingsMenuItemTheme';

export interface SettingsMenuItemData {
  label: string;
  iconName: IconName;
  onPress: () => void;
}

interface SettingsMenuItemProps {
  label: string;
  iconName: IconName;
  onPress: () => void;
}

export const SettingsMenuItem = ({ label, iconName, onPress }: SettingsMenuItemProps) => {
  const { styles } = useSettingsMenuItemTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <SvgIcon name={iconName} size="icon-size-xxl" color="font-primary" />
      <Text fontSize="font-size-lg" fontWeight="medium" style={styles.label}>
        {label}
      </Text>
      <SvgIcon name="ChevronRight" size="icon-size-lg" color="font-primary" />
    </TouchableOpacity>
  );
};
