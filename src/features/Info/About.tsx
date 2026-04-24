import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { ScrollView, View } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useContent } from 'query/Content/useContent';

import { useInfoTheme } from './theme/useInfoTheme';

export const About = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useInfoTheme();
  const { data: content, isLoading, error } = useContent('about');

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Acerca de"
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
