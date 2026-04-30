import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useAccountActionRowTheme } from './theme/useAccountActionRowTheme';

interface AccountActionRowProps {
  icon: IconName;
  label: string;
  onPress: () => void;
}

export const AccountActionRow = ({ icon, label, onPress }: AccountActionRowProps) => {
  const { styles } = useAccountActionRowTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <SvgIcon name={icon} size="icon-size-lg" color="font-primary" />
      <Text fontSize="font-size-md" fontWeight="semibold" style={styles.label}>
        {label}
      </Text>
      <SvgIcon name="ChevronRight" size="icon-size-sm" color="font-primary" />
    </TouchableOpacity>
  );
};
