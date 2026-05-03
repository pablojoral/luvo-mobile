import { IconButton } from 'components/IconButton/IconButton';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useScreenHeaderTheme } from './theme/useScreenHeaderTheme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  hideBack?: boolean;
  onBack?: () => void;
}

export const ScreenHeader = ({ title, subtitle, hideBack, onBack }: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const { styles } = useScreenHeaderTheme();

  const handleBack = onBack ?? (() => navigation.goBack());

  return (
    <View style={styles.container}>
      {!hideBack ? (
        <IconButton
          iconName="ChevronLeft"
          iconSize="icon-size-lg"
          onPress={handleBack}
          accessibilityLabel="Volver"
        />
      ) : null}
      <View style={styles.titleGroup}>
        <Text fontSize="font-size-xxl" fontWeight="bold">
          {title}
        </Text>
        {subtitle ? (
          <Text fontSize="font-size-sm" color="font-secondary">
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
