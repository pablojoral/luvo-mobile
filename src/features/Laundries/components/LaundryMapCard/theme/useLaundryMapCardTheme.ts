import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const IMAGE_SIZE = 112;

export const useLaundryMapCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      padding: theme.spacing['spacing-md'],
      ...theme.shadowCard,
    },
    info: {
      flex: 1,
      gap: theme.spacing['spacing-xs'],
    },
    image: {
      flexShrink: 0,
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      borderRadius: theme.cornerRad['corner-rad-lg'],
      overflow: 'hidden',
    },
    availabilityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
  });

  return { styles, theme };
};
