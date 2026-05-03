import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { VIEWFINDER_SIZE } from '../hooks/useQRViewfinderAnimation';

const CORNER_SIZE = 36;
const CORNER_RADIUS = 10;
const CORNER_WIDTH = 4;
const SCAN_LINE_INSET = 12;

export const useQRViewfinderTheme = () => {
  const theme = useTheme();
  const accentColor = theme.fontColor['font-highlight'];

  const styles = StyleSheet.create({
    viewfinder: {
      width: VIEWFINDER_SIZE,
      height: VIEWFINDER_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    corner: {
      position: 'absolute',
      width: CORNER_SIZE,
      height: CORNER_SIZE,
      borderColor: accentColor,
      borderStyle: 'solid' as const,
    },
    cornerTL: {
      top: 0, left: 0,
      borderTopWidth: CORNER_WIDTH, borderLeftWidth: CORNER_WIDTH,
      borderTopLeftRadius: CORNER_RADIUS,
    },
    cornerTR: {
      top: 0, right: 0,
      borderTopWidth: CORNER_WIDTH, borderRightWidth: CORNER_WIDTH,
      borderTopRightRadius: CORNER_RADIUS,
    },
    cornerBL: {
      bottom: 0, left: 0,
      borderBottomWidth: CORNER_WIDTH, borderLeftWidth: CORNER_WIDTH,
      borderBottomLeftRadius: CORNER_RADIUS,
    },
    cornerBR: {
      bottom: 0, right: 0,
      borderBottomWidth: CORNER_WIDTH, borderRightWidth: CORNER_WIDTH,
      borderBottomRightRadius: CORNER_RADIUS,
    },
    scanLine: {
      position: 'absolute',
      left: SCAN_LINE_INSET,
      right: SCAN_LINE_INSET,
      height: 2,
    },
  });

  return { styles, theme, accentColor };
};
