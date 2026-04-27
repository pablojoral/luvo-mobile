import { useMemo } from 'react';
import { useTheme } from 'theme/hooks/useTheme';

export const useBottomTabNavigatorTheme = () => {
  const theme = useTheme();

  const tabBarStyle = useMemo(
    () => ({
      borderRadius: theme.cornerRad['corner-rad-xxl'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      position: 'absolute' as const,
      height: theme.navBarHeight,
      paddingTop: theme.spacing['spacing-sm'],
      borderTopWidth: 0,
      ...theme.shadowBottomNav,
    }),
    [theme],
  );

  const tabBarLabelStyle = useMemo(
    () => ({ fontSize: theme.fontSize['font-size-md'] }),
    [theme],
  );

  const tabBarIconStyle = useMemo(
    // marginBottom intentional: nudges the icon position within the native
    // tab bar widget. This style is passed to React Navigation's iconStyle prop,
    // not applied to a flex container we control — cannot be replaced with gap.
    () => ({ marginBottom: theme.spacing['spacing-xs'] }),
    [theme],
  );

  return { tabBarStyle, tabBarLabelStyle, tabBarIconStyle, theme };
};
