import { useTheme } from 'theme/hooks/useTheme';

export const useSwitchTheme = () => {
  const theme = useTheme();

  return {
    theme,
    trackColorFalse: theme.borderColor['border-primary'],
    trackColorTrue: theme.surfaceColor['surface-invert'],
    thumbColor: theme.borderColor['border-invert'],
  };
};
