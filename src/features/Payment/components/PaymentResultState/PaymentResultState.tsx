import { Button, SvgIcon, Text } from '@luvo/ui';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { View } from 'react-native';

import { usePaymentResultState, type PaymentResultVariant } from './hooks/usePaymentResultState';
import { usePaymentResultStateTheme } from './theme/usePaymentResultStateTheme';

interface PaymentResultStateProps {
  variant: PaymentResultVariant;
  title: string;
  subtitle: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export const PaymentResultState = ({
  variant,
  title,
  subtitle,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: PaymentResultStateProps) => {
  const { styles, iconBoxStyle } = usePaymentResultStateTheme(variant);
  const { iconName, iconColor } = usePaymentResultState({ variant });

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <View style={iconBoxStyle}>
        <SvgIcon name={iconName} size={'icon-size-xxxl'} color={iconColor} />
      </View>
      <Text fontSize={'font-size-xl'} fontWeight={'semibold'} style={styles.title}>
        {title}
      </Text>
      <Text fontSize={'font-size-sm'} color={'font-light'} style={styles.subtitle}>
        {subtitle}
      </Text>
      <Button
        label={primaryLabel}
        variant="primary"
        size="md"
        fullWidth
        style={styles.actionButton}
        onPress={onPrimary}
      />
      {secondaryLabel && onSecondary ? (
        <Button label={secondaryLabel} variant="link" size="md" fullWidth onPress={onSecondary} />
      ) : null}
    </Animated.View>
  );
};
