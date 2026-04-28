import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MyLaundry } from 'models/models';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRemoveMyLaundry } from 'query/MyLaundries/useRemoveMyLaundry';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import type { ListRenderItem } from 'react-native';
import { MyLaundryItem } from '../components/MyLaundryItem/MyLaundryItem';

export const useMyLaundriesScreen = () => {
  const { t } = useTranslation('common');
  const navigation = useRootStackNavigation();
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data, isLoading } = useMyLaundries();
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
    renderItem,
    keyExtractor,
    title: t('myLaundries.title'),
    authSubtitle: t('myLaundries.authSubtitle'),
  };
};
