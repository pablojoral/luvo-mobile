import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Luvo',
  slug: 'luvomobile',
  scheme: 'luvo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'org.reactjs.native.example.luvomobile',
    googleServicesFile: './GoogleService-Info.plist',
    infoPlist: {
      NSLocationWhenInUseUsageDescription: 'Show current location on map.',
      NSCameraUsageDescription: 'Luvo quiere acceder a la cámara',
      MGLMapboxMetricsEnabledSettingShownInApp: true,
    },
  },
  android: {
    package: 'com.luvomobile',
    googleServicesFile: './google-services.json',
    permissions: ['android.permission.CAMERA', 'android.permission.POST_NOTIFICATIONS'],
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  plugins: [
    'expo-dev-client',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    '@react-native-firebase/messaging',
    '@rnmapbox/maps',
    [
      'react-native-vision-camera',
      { cameraPermissionText: 'Luvo quiere acceder a la cámara', enableMicrophonePermission: false },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Poppins-Light.ttf',
          './assets/fonts/Poppins-Regular.ttf',
          './assets/fonts/Poppins-Medium.ttf',
          './assets/fonts/Poppins-SemiBold.ttf',
          './assets/fonts/Poppins-Bold.ttf',
          './assets/fonts/Poppins-ExtraBold.ttf',
        ],
      },
    ],
    // Firebase requires static frameworks on iOS
    ['expo-build-properties', { ios: { useFrameworks: 'static' } }],
    'expo-web-browser',
  ],
};

export default config;
