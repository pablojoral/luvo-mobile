import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { FlatList, RefreshControl, View } from 'react-native';

import { MyLaundryEmptyList } from './components/MyLaundryEmptyList/MyLaundryEmptyList';
import { useMyLaundriesScreen } from './hooks/useMyLaundriesScreen';
import { useMyLaundriesTheme } from './theme/useMyLaundriesTheme';

export const MyLaundries = () => {
  const { styles } = useMyLaundriesTheme();
  const { firebaseUser, laundries, isLoading, isRefetching, refetch, renderItem, keyExtractor, title, authSubtitle } = useMyLaundriesScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} hideBack={true} />

      {!firebaseUser ? (
        <AuthRequiredScreen subtitle={authSubtitle} />
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
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        />
      )}
    </View>
  );
};
