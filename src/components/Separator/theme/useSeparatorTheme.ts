import { useTheme } from 'theme/hooks/useTheme';

export const useSeparatorTheme = () => {
  const theme = useTheme();

  const styles = {
    container: {
      height: theme.spacing['spacing-sm'],
    },
  };

  return { styles, theme };
};
