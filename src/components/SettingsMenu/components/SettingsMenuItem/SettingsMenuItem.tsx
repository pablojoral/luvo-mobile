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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SvgIcon name={iconName} size={'icon-size-xl'} />
      <Text fontSize={'font-size-xl'}>{label}</Text>
    </TouchableOpacity>
  );
};
