import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { MyLaundry } from 'models/models';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';

import { MyLaundryEmptyList } from './components/MyLaundryEmptyList/MyLaundryEmptyList';
import { MyLaundryItem } from './components/MyLaundryItem/MyLaundryItem';
import { useMyLaundriesTheme } from './theme/useMyLaundriesTheme';

export const MyLaundries = () => {
  const { styles } = useMyLaundriesTheme();
  const navigation = useRootStackNavigation();
  const { setSelectedLaundryId } = useSelectedLaundry();

  const { data, isLoading } = useMyLaundries();
  const laundries = data?.laundries ?? [];

  const handlePress = (laundry: MyLaundry) => {
    setSelectedLaundryId(laundry.id);
    navigation.navigate('Tabs');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Mis lavanderías" />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={laundries}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <MyLaundryItem item={item} onPress={() => handlePress(item)} />}
          contentContainerStyle={laundries.length === 0 ? styles.emptyContainer : styles.listContent}
          ListEmptyComponent={<MyLaundryEmptyList />}
        />
      )}
    </View>
  );
};
