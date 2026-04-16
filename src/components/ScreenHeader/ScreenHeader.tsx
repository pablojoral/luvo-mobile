import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useScreenHeaderTheme } from './theme/useScreenHeaderTheme';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export const ScreenHeader = ({ title, onBack }: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const { styles } = useScreenHeaderTheme();

  const handleBack = onBack ?? (() => navigation.goBack());

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack} accessibilityLabel="Volver">
        <SvgIcon name="ArrowLeftCircle" size="font-size-xxl" />
      </TouchableOpacity>
      <Text fontSize="font-size-lg" fontWeight="semibold" style={styles.title}>
        {title}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
};
