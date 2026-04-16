import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor, FontSize, FontWeight } from 'theme/types/Theme';

interface UseTextThemeParams {
  fontSize: FontSize;
  color: FontColor;
  // lineHeight: LineHeight;
  fontWeight: FontWeight;
}

export const useTextTheme = ({
  fontSize = 'font-size-md',
  color = 'font-primary',
  // lineHeight = 'line-height-md',
  fontWeight = 'regular',
}: UseTextThemeParams) => {
  const theme = useTheme();
  const styles: { text: TextStyle } = StyleSheet.create({
    text: {
      fontFamily: 'Poppins',
      fontSize: theme.fontSize[fontSize],
      color: theme.fontColor[color],
      // lineHeight: theme.lineHeight[lineHeight],
      fontWeight: theme.fontWeight[fontWeight],
    },
  });
  return { styles };
};
