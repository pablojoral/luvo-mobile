import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const HERO_HEIGHT = 200;
const HERO_OVERLAP = 28;

export const useLaundryDetailsHeroTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      // No overflow:hidden — lets the info card extend below the hero
    },
    hero: {
      height: HERO_HEIGHT,
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButton: {
      position: 'absolute',
      top: theme.topInset + theme.spacing['spacing-xs'],
      left: theme.spacing['spacing-md'],
    },
    starButton: {
      position: 'absolute',
      top: theme.topInset + theme.spacing['spacing-xs'],
      right: theme.spacing['spacing-md'],
    },
    infoCard: {
      marginTop: -HERO_OVERLAP,
      marginHorizontal: theme.spacing['spacing-md'],
    },
  });

  return { styles };
};
