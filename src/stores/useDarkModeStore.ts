import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DarkModeState {
  darkMode:    boolean;
  setDarkMode: (value: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      darkMode:    false,
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name:    'dark-mode',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
