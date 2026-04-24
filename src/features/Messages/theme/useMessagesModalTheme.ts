import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMessagesModalTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
    card: {
      width: '100%',
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xxl'],
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
      overflow: 'hidden',
    },
    transitionContent: {
      gap: theme.spacing['spacing-lg'],
    },
    textContainer: {
      gap: theme.spacing['spacing-sm'],
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing['spacing-sm'],
    },
    actionEnd: {
      // marginLeft: 'auto' is a flex push to right-align a single action button;
      // not a sibling-spacing pattern — cannot be expressed as gap or padding.
      marginLeft: 'auto',
    },
  });

  return { styles, theme };
};
