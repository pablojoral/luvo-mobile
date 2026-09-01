import { Loader, Text } from '@luvo/ui';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { usePaymentLoadingStateTheme } from './theme/usePaymentLoadingStateTheme';

interface PaymentLoadingStateProps {
  message: string;
}

export const PaymentLoadingState = ({ message }: PaymentLoadingStateProps) => {
  const { styles } = usePaymentLoadingStateTheme();

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <Loader />
      <Text fontSize={'font-size-md'} color={'font-secondary'} style={styles.message}>
        {message}
      </Text>
    </Animated.View>
  );
};
