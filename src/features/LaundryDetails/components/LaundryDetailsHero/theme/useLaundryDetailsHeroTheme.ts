import { StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const HERO_HEIGHT = 200;
export const HERO_OVERLAP = 32;

export const useLaundryDetailsHeroTheme = () => {
  const theme = useTheme();
  const { width: heroImageWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    wrapper: {},
    hero: {
      height: HERO_HEIGHT,
      backgroundColor: theme.surfaceColor['surface-invert'],
      overflow: 'hidden',
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
  });

  return { styles, heroImageWidth };
};
