import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useInfoTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    body: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
    },
    accordionItem: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor['border-primary'],
    },
    accordionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing['spacing-lg'],
      gap: theme.spacing['spacing-md'],
    },
    accordionBodyAnimated: {
      overflow: 'hidden',
    },
    accordionBody: {
      paddingBottom: theme.spacing['spacing-lg'],
    },
    accordionBodyGhost: {
      position: 'absolute',
      opacity: 0,
      left: 0,
      right: 0,
      paddingBottom: theme.spacing['spacing-lg'],
    },
    faqQuestion: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing['spacing-xl'],
    },
  });

  return { styles, theme };
};
