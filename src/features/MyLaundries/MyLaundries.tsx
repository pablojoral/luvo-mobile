import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { MyLaundry } from 'models/models';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRemoveMyLaundry } from 'query/MyLaundries/useRemoveMyLaundry';
import React from 'react';
import { FlatList, View } from 'react-native';
import { MyLaundryEmptyList } from './components/MyLaundryEmptyList/MyLaundryEmptyList';
import { MyLaundryItem } from './components/MyLaundryItem/MyLaundryItem';
import { useMyLaundriesTheme } from './theme/useMyLaundriesTheme';

export const MyLaundries = () => {
  const { styles } = useMyLaundriesTheme();
  const navigation = useRootStackNavigation();
  const { data: firebaseUser } = useFirebaseAuthState();

  const { data, isLoading } = useMyLaundries();
  const { mutate: remove } = useRemoveMyLaundry();
  const laundries = data?.laundries ?? [];

  const handlePress = (laundry: MyLaundry) => {
    navigation.navigate('LaundryDetails', { laundryId: laundry.id });
  };

  const handleShowQR = (laundry: MyLaundry) => {
    navigation.navigate('LaundryQR', {
      accessCode: laundry.accessCode ?? '',
      laundryName: laundry.name,
    });
  };

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
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MyLaundryItem
              item={item}
              onPress={() => handlePress(item)}
              onRemove={() => remove(item.id)}
              onShowQR={() => handleShowQR(item)}
            />
          )}
          contentContainerStyle={laundries.length === 0 ? styles.emptyContainer : styles.listContent}
          ListEmptyComponent={<MyLaundryEmptyList />}
        />
      )}
    </View>
  );
};
