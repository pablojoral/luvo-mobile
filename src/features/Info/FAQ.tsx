import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFAQ } from 'query/Content/useFAQ';
import type { FAQItem } from 'services/api/services/ContentService';

import { FAQAccordionItem } from './components/FAQAccordionItem/FAQAccordionItem';
import { useInfoTheme } from './theme/useInfoTheme';

export const FAQ = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useInfoTheme();
  const { data: items, isLoading, error } = useFAQ();

  const renderItem = useCallback(({ item }: { item: FAQItem }) => <FAQAccordionItem item={item} />, []);
  const keyExtractor = useCallback((item: FAQItem) => String(item.id), []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Preguntas frecuentes"
        onBack={() => navigation.goBack()}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text color="font-error">
            No se pudo cargar el contenido. Intentá de nuevo.
          </Text>
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
  );
};
