// theme/useLaundryDetailsModalTheme.ts
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryDetailsCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-sm'],
      gap: theme.spacing['spacing-md'],
    },
    tagsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
    infoContainer: {
      flex: 1,
      flexShrink: 1,
    },
    infoContentContainer: {
      justifyContent: 'space-between',
      gap: theme.spacing['spacing-xs'],
      flexWrap: 'wrap',
    },
    textContainer: {
      gap: theme.spacing['spacing-xs'],
    },
    imageContainer: {
      flexShrink: 0,
      justifyContent: 'center',
      alignItems: 'center',
      height: 112,
      width: 112,
      borderRadius: theme.cornerRad['corner-rad-full'],
      overflow: 'hidden',
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-primary'],
    },
  });

  const wave = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  });

  return { styles, wave, theme };
};
