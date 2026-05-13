import { SafeScreenHeader, Text } from '@luvo/ui';
import { FlatList, View } from 'react-native';

import { useFAQScreen } from './hooks/useFAQScreen';
import { useInfoTheme } from './theme/useInfoTheme';

export const FAQ = () => {
  const { styles } = useInfoTheme();
  const {
    title,
    loadingText,
    loadError,
    items,
    isLoading,
    error,
    renderItem,
    keyExtractor,
    handleGoBack,
  } = useFAQScreen();

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
          <FlatList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
          />
        )}
      </View>
    </View>
  );
};
