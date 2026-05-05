import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_MARGIN = 3;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2;

export const useSwitchTheme = (disabled: boolean) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    trackOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    thumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.borderColor['border-invert'],
    },
  });

  const trackStyle = useMemo(() => ({
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: theme.cornerRad['corner-rad-full'],
    backgroundColor: theme.surfaceColor['surface-background'],
    justifyContent: 'center' as const,
    padding: THUMB_MARGIN,
    overflow: 'hidden' as const,
    opacity: disabled ? 0.4 : 1,
  }), [disabled, theme]);

  return { styles, trackStyle, theme, thumbTravel: THUMB_TRAVEL };
};
