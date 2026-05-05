import { Button } from 'components/Button/Button';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useErrorScreen } from './hooks/useErrorScreen';
import { useErrorScreenTheme } from './theme/useErrorScreenTheme';

interface ErrorScreenProps {
  onReset: () => void;
}

export const ErrorScreen = ({ onReset }: ErrorScreenProps) => {
  const { strings, handleRetry } = useErrorScreen(onReset);
  const { styles } = useErrorScreenTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SvgIcon name="AlertTriangle" size="icon-size-xxxxxxl" color="font-error" />
        <Text fontSize="font-size-lg" fontWeight="semibold" color="font-primary">
          {strings.title}
        </Text>
        <Text fontSize="font-size-sm" color="font-secondary" textAlign="center">
          {strings.body}
        </Text>
      </View>
      <Button label={strings.retry} onPress={handleRetry} variant="primary" size="md" />
    </View>
  );
};
