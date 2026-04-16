import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '..';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useRootStackNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return navigation;
};
