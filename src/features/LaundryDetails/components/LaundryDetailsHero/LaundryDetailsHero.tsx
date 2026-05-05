import { IconButton } from 'components/IconButton/IconButton';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { View } from 'react-native';

import { useLaundryDetailsHero } from './hooks/useLaundryDetailsHero';
import { useLaundryDetailsHeroTheme } from './theme/useLaundryDetailsHeroTheme';

export const LaundryDetailsHero = () => {
  const { styles, heroImageWidth, heroHeight } = useLaundryDetailsHeroTheme();
  const { handleGoBack, myLaundriesButton, showFavorite } = useLaundryDetailsHero();

  return (
    <View style={styles.wrapper}>
      <View style={styles.hero}>
        <SvgImage name="laundry-small" width={heroImageWidth} height={heroHeight} preserveAspectRatio="xMidYMid slice" />
      </View>
      <IconButton iconName="ChevronLeft" style={styles.backButton} onPress={handleGoBack} />
      {showFavorite && (
        <IconButton
          iconName="Star"
          iconColor={myLaundriesButton.color}
          style={styles.starButton}
          onPress={myLaundriesButton.onPress}
          disabled={myLaundriesButton.disabled || myLaundriesButton.isPending}
        />
      )}
    </View>
  );
};
