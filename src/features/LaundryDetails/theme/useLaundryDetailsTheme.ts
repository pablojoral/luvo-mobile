import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { HERO_OVERLAP } from '../components/LaundryDetailsHero/theme/useLaundryDetailsHeroTheme';

export const useLaundryDetailsTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    body: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
      marginTop: -HERO_OVERLAP,
      gap: theme.spacing['spacing-md'],
      padding: theme.spacing['spacing-md'],
    },
  });

  return { styles };
};
