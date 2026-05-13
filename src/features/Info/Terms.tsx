import { SafeScreenHeader, Text } from '@luvo/ui';
import { ScrollView, View } from 'react-native';

import { useTermsScreen } from './hooks/useTermsScreen';
import { useInfoTheme } from './theme/useInfoTheme';

export const Terms = () => {
  const { styles } = useInfoTheme();
  const { title, loadingText, loadError, content, isLoading, error, handleGoBack } =
    useTermsScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} onBack={handleGoBack} />
      <View style={styles.body}>
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
            <Text lineHeight="line-height-lg">{content?.body}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};
