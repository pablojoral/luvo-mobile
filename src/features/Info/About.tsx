import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { Text } from 'components/Text/Text';
import { ScrollView, View } from 'react-native';

import { useAboutScreen } from './hooks/useAboutScreen';
import { useInfoTheme } from './theme/useInfoTheme';

export const About = () => {
  const { styles } = useInfoTheme();
  const { title, loadingText, loadError, content, isLoading, error, handleGoBack } =
    useAboutScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} onBack={handleGoBack} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>{loadingText}</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text color="font-error">{loadError}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.contentText}>{content?.body}</Text>
        </ScrollView>
      )}
    </View>
  );
};
