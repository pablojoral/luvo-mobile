import { IconButton } from 'components/IconButton/IconButton';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { LaundryDetailsCard } from 'features/LaundryDetails/components/LaundryDetailsCard/LaundryDetailsCard';
import { Laundry } from 'models/models';
import { View } from 'react-native';

import { useLaundryDetailsHero } from './hooks/useLaundryDetailsHero';
import { useLaundryDetailsHeroTheme } from './theme/useLaundryDetailsHeroTheme';

interface LaundryDetailsHeroProps {
  laundry: Laundry | null;
}

export const LaundryDetailsHero = ({ laundry }: LaundryDetailsHeroProps) => {
  const { styles } = useLaundryDetailsHeroTheme();
  const { handleGoBack, myLaundriesButton, showFavorite } = useLaundryDetailsHero();

  return (
    <View style={styles.wrapper}>
      <View style={styles.hero}>
        <SvgImage name="laundry-small" height={120} width={120} />
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
      <LaundryDetailsCard laundry={laundry} style={styles.infoCard} />
    </View>
  );
};
