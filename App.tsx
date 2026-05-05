import 'react-native-reanimated';
import 'services/i18n';

import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { Navigator } from 'navigation';
import { QueryProvider } from 'query/provider';
import { useNotifications } from 'services/firebase/hooks/useNotifications';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Dev only
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs(true);
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <GestureHandlerRootView>
          <AppContent />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryProvider>
  );
}

function AppContent() {
  useNotifications();
  return (
    <View style={styles.container}>
      <ErrorBoundary>
        <Navigator />
      </ErrorBoundary>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
