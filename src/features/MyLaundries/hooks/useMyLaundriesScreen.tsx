import { useCallback, useState } from 'react';
import { MyLaundry } from 'models/models';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRemoveMyLaundry } from 'query/MyLaundries/useRemoveMyLaundry';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import type { ListRenderItem } from 'react-native';
import { MyLaundryItem } from '../components/MyLaundryItem/MyLaundryItem';
import { useMyLaundriesStrings } from './useMyLaundriesStrings';

export const useMyLaundriesScreen = () => {
  const { title, authSubtitle, authDefaultSubtitle, authTitle, authSignInLabel, loadError } = useMyLaundriesStrings();
  const navigation = useRootStackNavigation();
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data, isLoading, isError, refetch } = useMyLaundries();
  const showLoader = isLoading && !data;
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const { mutate: remove } = useRemoveMyLaundry();

  const laundries = data?.laundries ?? [];

  const handlePress = useCallback(
    (laundry: MyLaundry) => {
      navigation.navigate('LaundryDetails', { laundryId: laundry.id });
    },
    [navigation],
  );

  const handleShowQR = useCallback(
    (laundry: MyLaundry) => {
      navigation.navigate('LaundryQR', {
        accessCode: laundry.accessCode ?? '',
        laundryName: laundry.name,
      });
    },
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<MyLaundry>>(
    ({ item }) => (
      <MyLaundryItem
        item={item}
        onPress={() => handlePress(item)}
        onRemove={() => remove(item.id)}
        onShowQR={() => handleShowQR(item)}
      />
    ),
    [handlePress, handleShowQR, remove],
  );

  const keyExtractor = useCallback((item: MyLaundry) => String(item.id), []);

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);

  return {
    firebaseUser,
    laundries,
    showLoader,
    isError,
    isManualRefreshing,
    handleRefresh,
    renderItem,
    keyExtractor,
    title,
    authSubtitle,
    authDefaultSubtitle,
    authTitle,
    authSignInLabel,
    loadError,
  };
};
