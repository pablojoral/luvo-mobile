import { Button } from 'components/Button/Button';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useLoadErrorStateStrings } from './hooks/useLoadErrorStateStrings';
import { useLoadErrorStateTheme } from './theme/useLoadErrorStateTheme';

interface LoadErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const LoadErrorState = ({ message, onRetry }: LoadErrorStateProps) => {
  const { title, retryLabel } = useLoadErrorStateStrings();
  const { styles } = useLoadErrorStateTheme();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name="luvo-logo-pink" height={96} width={96} />
        <Text fontSize="font-size-lg" fontWeight="semibold" color="font-primary">
          {title}
        </Text>
        <Text fontSize="font-size-sm" color="font-secondary" textAlign="center">
          {message}
        </Text>
      </View>
      <Button label={retryLabel} variant="primary" size="md" onPress={onRetry} />
    </View>
  );
};
