import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export interface SettingsMenuItem {
  label: string;
  iconName: IconName;
  onPress: () => void;
}

export const SettingsMenuItem = ({ label, iconName, onPress }: SettingsMenuItem) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-sm'],
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SvgIcon name={iconName} size={'font-size-xxl'} />
      <Text fontSize={'font-size-xl'}>{label}</Text>
    </TouchableOpacity>
  );
};
