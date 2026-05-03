import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useScreenHeaderTheme } from './theme/useScreenHeaderTheme';

interface ScreenHeaderProps {
  title: string;
  hideBack?: boolean;
  onBack?: () => void;
}

export const ScreenHeader = ({ title, hideBack, onBack }: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const { styles } = useScreenHeaderTheme();

  const handleBack = onBack ?? (() => navigation.goBack());

  return (
    <View style={styles.container}>
      {!hideBack ? (
        <TouchableOpacity style={styles.backButton} onPress={handleBack} accessibilityLabel="Volver">
          <SvgIcon name="ChevronLeft" size="icon-size-lg" />
        </TouchableOpacity>
      ) : null}
      <Text fontSize="font-size-xxl" fontWeight="bold">{title}</Text>
    </View>
  );
};
