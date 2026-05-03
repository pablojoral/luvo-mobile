import { useCallback } from 'react';
import { MyLaundry } from 'models/models';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRemoveMyLaundry } from 'query/MyLaundries/useRemoveMyLaundry';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import type { ListRenderItem } from 'react-native';
import { MyLaundryItem } from '../components/MyLaundryItem/MyLaundryItem';
import { useMyLaundriesStrings } from './useMyLaundriesStrings';

export const useMyLaundriesScreen = () => {
  const { title, authSubtitle } = useMyLaundriesStrings();
  const navigation = useRootStackNavigation();
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data, isLoading, isRefetching, refetch } = useMyLaundries();
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

  return {
    firebaseUser,
    laundries,
    isLoading,
    isRefetching,
    refetch,
    renderItem,
    keyExtractor,
    title,
    authSubtitle,
  };
};
