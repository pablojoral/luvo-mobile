import { StyleSheet } from 'react-native';

export const useAccountSectionLabelTheme = () => {
  const styles = StyleSheet.create({
    label: {
      letterSpacing: 1.5,
      paddingLeft: 4,
    },
  });

  return { styles };
};
