import { Loader } from 'components/Loader/Loader';
import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { FlatList, RefreshControl, View } from 'react-native';

import { MyLaundryEmptyList } from './components/MyLaundryEmptyList/MyLaundryEmptyList';
import { useMyLaundriesScreen } from './hooks/useMyLaundriesScreen';
import { useMyLaundriesTheme } from './theme/useMyLaundriesTheme';

export const MyLaundries = () => {
  const { styles } = useMyLaundriesTheme();
  const {
    firebaseUser,
    laundries,
    showLoader,
    isManualRefreshing,
    handleRefresh,
    renderItem,
    keyExtractor,
    title,
    authSubtitle,
  } = useMyLaundriesScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} hideBack={true} />

      <View style={styles.body}>
        {!firebaseUser ? (
          <AuthRequiredScreen subtitle={authSubtitle} />
        ) : showLoader ? (
          <View style={styles.loadingContainer}>
            <Loader size={'icon-size-128'} />
          </View>
        ) : (
          <FlatList
            data={laundries}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={laundries.length === 0 ? styles.emptyContainer : styles.listContent}
            ListEmptyComponent={<MyLaundryEmptyList />}
            refreshControl={<RefreshControl refreshing={isManualRefreshing} onRefresh={handleRefresh} />}
          />
        )}
      </View>
    </View>
  );
};
