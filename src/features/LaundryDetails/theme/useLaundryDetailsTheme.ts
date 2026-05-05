import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { useLaundryDetailsHeroTheme } from '../components/LaundryDetailsHero/theme/useLaundryDetailsHeroTheme';

export const useLaundryDetailsTheme = () => {
  const theme = useTheme();
  const { heroOverlap } = useLaundryDetailsHeroTheme();

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
      marginTop: -heroOverlap,
      gap: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingTop: theme.spacing['spacing-md'],
    },
  });

  return { styles };
};
