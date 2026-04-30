import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor } from 'theme/types/Theme';

interface Params {
  error?: boolean;
  color?: FontColor;
  placeholderColor?: FontColor;
}

export const useTextInputTheme = ({
  error = false,
  color = 'font-primary',
  placeholderColor = 'font-placeholder',
}: Params = {}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing['spacing-xxs'],
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    errorText: {
      flex: 1,
    },
    input: {
      width: '100%',
      height: theme.spacing['spacing-xxxxl'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderColor: error
        ? theme.borderColor['border-error']
        : theme.fontColor['font-primary'],
      paddingHorizontal: theme.spacing['spacing-sm'],
      fontSize: theme.fontSize['font-size-md'],
      color: theme.fontColor[color],
    },
  });

  return { styles, placeholderTextColor: theme.fontColor[placeholderColor] };
};
