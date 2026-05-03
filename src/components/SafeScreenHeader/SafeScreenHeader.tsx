import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { View } from 'react-native';
import { useSafeScreenHeaderTheme } from './theme/useSafeScreenHeaderTheme';

interface SafeScreenHeaderProps {
  title: string;
  subtitle?: string;
  hideBack?: boolean;
  onBack?: () => void;
}

export const SafeScreenHeader = ({ title, subtitle, hideBack, onBack }: SafeScreenHeaderProps) => {
  const { styles } = useSafeScreenHeaderTheme();

  return (
    <View style={styles.wrapper}>
      <ScreenHeader title={title} subtitle={subtitle} hideBack={hideBack} onBack={onBack} />
    </View>
  );
};
