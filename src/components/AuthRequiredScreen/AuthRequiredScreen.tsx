import { Button } from 'components/Button/Button';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useAuthRequiredScreen } from './hooks/useAuthRequiredScreen';
import { useAuthRequiredScreenTheme } from './theme/useAuthRequiredScreenTheme';

interface AuthRequiredScreenProps {
  subtitle?: string;
}

export const AuthRequiredScreen = ({ subtitle }: AuthRequiredScreenProps) => {
  const { styles } = useAuthRequiredScreenTheme();
  const { handleSignIn, title, defaultSubtitle, signInLabel } = useAuthRequiredScreen();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name={'luvo-logo-pink'} height={128} width={128} />
        <Text fontSize="font-size-lg" fontWeight="semibold">
          {title}
        </Text>
        <Text color="font-light" fontSize="font-size-sm">
          {subtitle ?? defaultSubtitle}
        </Text>
      </View>
      <Button label={signInLabel} onPress={handleSignIn} />
    </View>
  );
};
