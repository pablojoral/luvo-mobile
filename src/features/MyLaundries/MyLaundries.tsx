import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { FlatList, View } from 'react-native';
import { MyLaundryEmptyList } from './components/MyLaundryEmptyList/MyLaundryEmptyList';
import { useMyLaundriesScreen } from './hooks/useMyLaundriesScreen';
import { useMyLaundriesTheme } from './theme/useMyLaundriesTheme';

export const MyLaundries = () => {
  const { styles } = useMyLaundriesTheme();
  const { firebaseUser, laundries, isLoading, renderItem, keyExtractor } = useMyLaundriesScreen();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Mis lavanderías" hideBack={true} />

      {!firebaseUser ? (
        <AuthRequiredScreen subtitle="Inicia sesión para ver tus lavanderías." />
      ) : isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={laundries}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={laundries.length === 0 ? styles.emptyContainer : styles.listContent}
          ListEmptyComponent={<MyLaundryEmptyList />}
        />
      )}
    </View>
  );
};
