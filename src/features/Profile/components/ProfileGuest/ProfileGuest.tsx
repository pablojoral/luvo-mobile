import { View } from 'react-native';
import { Text } from 'components/Text/Text';
import { Button } from 'components/Button/Button';
import { SvgImage } from 'components/SvgImage/SvgImage';

import { useProfileGuest } from './hooks/useProfileGuest';
import { useProfileGuestTheme } from './theme/useProfileGuestTheme';

export const ProfileGuest = () => {
  const { styles } = useProfileGuestTheme();
  const { handleSignIn, title, subtitle, signInLabel } = useProfileGuest();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name={'luvo-logo-pink'} height={128} width={128} />
        <Text fontSize="font-size-lg" fontWeight="semibold">
          {title}
        </Text>
        <Text color="font-light" fontSize="font-size-sm">
          {subtitle}
        </Text>
      </View>
      <Button label={signInLabel} onPress={handleSignIn} />
    </View>
  );
};
