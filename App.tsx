import 'react-native-reanimated';
import 'services/i18n';

import { ThemeProvider, defaultTheme, darkTheme, ErrorBoundary } from '@luvo/ui';
import { Navigator } from 'navigation';
import { QueryProvider } from 'query/provider';
import { useNotifications } from 'services/firebase/hooks/useNotifications';
import { useAppContentStrings } from 'hooks/useAppContentStrings';
import { useDarkModeStore } from 'stores/useDarkModeStore';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Dev only
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs(true);
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const darkModePreference = useDarkModeStore((state) => state.darkMode);
  const activeTheme = darkModePreference ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      <QueryProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <GestureHandlerRootView>
            <AppContent />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  useNotifications();
  const { errorBoundaryTitle, errorBoundaryBody, errorBoundaryRetry } = useAppContentStrings();
  return (
    <View style={styles.container}>
      <ErrorBoundary
        title={errorBoundaryTitle}
        body={errorBoundaryBody}
        retryLabel={errorBoundaryRetry}
      >
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
