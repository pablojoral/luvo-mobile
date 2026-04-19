import { Text } from 'components/Text/Text';
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
          fontWeight="semibold"
          color="font-placeholder"
          style={styles.groupTitle}
        >
          {title.toUpperCase()}
        </Text>
      ) : null}
      <View style={styles.groupCard}>{children}</View>
    </View>
  );
};
