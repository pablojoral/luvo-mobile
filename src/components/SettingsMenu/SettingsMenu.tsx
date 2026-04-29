import { View } from 'react-native';
import { SettingsMenuItem, type SettingsMenuItemData } from './components/SettingsMenuItem/SettingsMenuItem';
import { useSettingsMenuTheme } from './theme/useSettingsMenuTheme';

interface SettingsMenuProps {
  items: SettingsMenuItemData[];
}

export const SettingsMenu = ({ items }: SettingsMenuProps) => {
  const { styles } = useSettingsMenuTheme();

  return (
    <View style={styles.container}>
      {items.map(item => (
        <SettingsMenuItem
          key={item.label}
          label={item.label}
          iconName={item.iconName}
          onPress={item.onPress}
          trailingIcon={item.trailingIcon}
        />
      ))}
    </View>
  );
};
