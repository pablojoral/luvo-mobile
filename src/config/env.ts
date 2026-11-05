/**
 * Public runtime config. Values come from `.env` via Expo's EXPO_PUBLIC_ inlining
 * (statically referenced so Metro can substitute them at bundle time).
 */
export const Config = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
  MP_PUBLIC_KEY: process.env.EXPO_PUBLIC_MP_PUBLIC_KEY,
} as const;
