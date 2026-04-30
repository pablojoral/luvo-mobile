import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { View } from 'react-native';
import { useSafeScreenHeaderTheme } from './theme/useSafeScreenHeaderTheme';

interface SafeScreenHeaderProps {
  title: string;
  hideBack?: boolean;
  onBack?: () => void;
}

export const SafeScreenHeader = ({ title, hideBack, onBack }: SafeScreenHeaderProps) => {
  const { styles } = useSafeScreenHeaderTheme();

  return (
    <View style={styles.wrapper}>
      <ScreenHeader title={title} hideBack={hideBack} onBack={onBack} />
    </View>
  );
};
