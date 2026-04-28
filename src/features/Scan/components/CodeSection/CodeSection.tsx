import { Button } from 'components/Button/Button';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { View } from 'react-native';

import { useCodeSection } from './hooks/useCodeSection';
import { useCodeSectionTheme } from './theme/useCodeSectionTheme';

export const CodeSection = () => {
  const { styles } = useCodeSectionTheme();
  const { title, buttonLabel } = useCodeSection();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>{title}</Text>
        <TextInput />
      </View>
      <Button label={buttonLabel} />
    </View>
  );
};
