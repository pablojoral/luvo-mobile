import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from '@luvo/ui';
import type { WsConnectionState } from 'stores/useLaundriesStore';

const colorMap: Record<WsConnectionState, string> = {
  idle: Colors['colors-grey-300'],
  connecting: Colors['colors-yellow-500'],
  connected: Colors['colors-green-500'],
  reconnecting: Colors['colors-yellow-500'],
  error: Colors['colors-red-500'],
};

interface UseWsStatusIndicatorThemeProps {
  state: WsConnectionState;
}

export const useWsStatusIndicatorTheme = ({ state }: UseWsStatusIndicatorThemeProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    dot: {
      width: theme.spacing['spacing-sm'],
      height: theme.spacing['spacing-sm'],
      borderRadius: theme.cornerRad['corner-rad-full'],
    },
    container: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingHorizontal: theme.spacing['spacing-sm'],
      paddingVertical: theme.spacing['spacing-xs'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
  });

  const dotColorStyle = useMemo(
    () => ({ backgroundColor: colorMap[state] }),
    [state],
  );

  return { styles, dotColorStyle, theme };
};
