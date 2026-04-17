import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '..';

export const useProfileStackNavigation = () => {
  return useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
};
