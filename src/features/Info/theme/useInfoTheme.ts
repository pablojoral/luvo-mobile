import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useInfoTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
    },
    contentText: {
      fontSize: theme.fontSize['font-size-md'],
      lineHeight: theme.lineHeight['line-height-lg'],
      color: theme.fontColor['font-primary'],
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
      fontSize: theme.fontSize['font-size-md'],
      fontWeight: '600',
      color: theme.fontColor['font-primary'],
    },
    faqAnswer: {
      fontSize: theme.fontSize['font-size-sm'],
      lineHeight: theme.lineHeight['line-height-lg'],
      color: theme.fontColor['font-placeholder'],
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
