import 'react-native-reanimated';

import { Navigator } from 'navigation';
import { QueryProvider } from 'query/provider';
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
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
