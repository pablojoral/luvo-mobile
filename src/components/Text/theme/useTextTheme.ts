import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor, FontSize, FontWeight, LineHeight } from 'theme/types/Theme';

interface UseTextThemeParams {
  fontSize: FontSize;
  color: FontColor;
  fontWeight: FontWeight;
  lineHeight?: LineHeight;
}

// iOS ignores fontWeight on custom fonts — explicit family names are required.
// These names must match the PostScript names embedded in each TTF file.
const POPPINS_FAMILY: Record<FontWeight, string> = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extrabold: 'Poppins-ExtraBold',
};

export const useTextTheme = ({
  fontSize = 'font-size-md',
  color = 'font-primary',
  fontWeight = 'regular',
  lineHeight,
}: UseTextThemeParams) => {
  const theme = useTheme();
  const styles: { text: TextStyle } = StyleSheet.create({
    text: {
      fontFamily: POPPINS_FAMILY[fontWeight],
      fontSize: theme.fontSize[fontSize],
      color: theme.fontColor[color],
      ...(lineHeight !== undefined && { lineHeight: theme.lineHeight[lineHeight] }),
    },
  });
  return { styles, theme };
};
