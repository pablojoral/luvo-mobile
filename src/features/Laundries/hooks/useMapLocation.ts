import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { requestAndroidLocationPermissions } from '@rnmapbox/maps';

export const useMapLocation = () => {
  // On iOS, UserLocation triggers the system dialog itself — start granted.
  // On Android, we must request at runtime before rendering UserLocation.
  const [locationGranted, setLocationGranted] = useState(Platform.OS !== 'android');

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    requestAndroidLocationPermissions().then(granted => setLocationGranted(granted));
  }, []);

  return { locationGranted };
};
