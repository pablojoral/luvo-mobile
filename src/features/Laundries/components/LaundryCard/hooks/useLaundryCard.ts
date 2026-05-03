import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';

interface UseLaundryCardProps {
  onLayout?: (height: number) => void;
}

export const useLaundryCard = ({ onLayout }: UseLaundryCardProps) => {
  const navigation = useRootStackNavigation();
  const { selectedLaundryId } = useSelectedLaundry();
  const currentLaundry = useLaundriesStore(s => s.laundries.find(l => l.id === selectedLaundryId) ?? null);

  const laundryRef = useRef(currentLaundry);
  if (currentLaundry) laundryRef.current = currentLaundry;
  const laundry = laundryRef.current;

  const handleLayout = (e: LayoutChangeEvent) => onLayout?.(e.nativeEvent.layout.height);
  const handlePress = () => {
    if (laundry) navigation.navigate('LaundryDetails', { laundryId: laundry.id });
  };

  return { laundry, handleLayout, handlePress };
};
