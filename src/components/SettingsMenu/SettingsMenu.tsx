import { StyleSheet, View } from 'react-native';
import { SettingsMenuItem } from './components/SettingsMenuItem/SettingsMenuItem';
import { useTheme } from 'theme/hooks/useTheme';

interface SettingsMenuProps {
  items: SettingsMenuItem[];
}

export const SettingsMenu = ({ items }: SettingsMenuProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing['spacing-md'],
    },
  });
  return (
    <View style={styles.container}>
      {items.map(item => (
        <SettingsMenuItem key={item.label} label={item.label} iconName={item.iconName} onPress={item.onPress} />
      ))}
    </View>
  );
};
