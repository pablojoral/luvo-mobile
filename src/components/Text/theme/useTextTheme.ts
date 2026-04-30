import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor, FontSize, FontWeight } from 'theme/types/Theme';

interface UseTextThemeParams {
  fontSize: FontSize;
  color: FontColor;
  fontWeight: FontWeight;
}

export const useTextTheme = ({
  fontSize = 'font-size-md',
  color = 'font-primary',
  fontWeight = 'regular',
}: UseTextThemeParams) => {
  const theme = useTheme();
  const styles: { text: TextStyle } = StyleSheet.create({
    text: {
      fontFamily: theme.fontFamily.poppins,
      fontSize: theme.fontSize[fontSize],
      color: theme.fontColor[color],
      fontWeight: theme.fontWeight[fontWeight],
    },
  });
  return { styles, theme };
};
