import { Text } from '@luvo/ui';
import { View } from 'react-native';
import { useSettingsTheme } from 'features/Settings/theme/useSettingsTheme';

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsGroup = ({ title, children }: SettingsGroupProps) => {
  const { styles } = useSettingsTheme();

  return (
    <View style={styles.group}>
      {title ? (
        <Text
          fontSize="font-size-xs"
          fontWeight="bold"
          color="font-placeholder"
          style={styles.groupTitle}
        >
          {title.toUpperCase()}
        </Text>
      ) : null}
      {children}
    </View>
  );
};
