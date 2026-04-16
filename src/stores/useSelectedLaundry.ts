/**
 * useSelectedLaundry — stores only the selected laundry ID.
 *
 * The full Laundry object is derived from useLaundriesStore so that
 * WebSocket updates are automatically reflected everywhere without
 * needing to refresh this store separately.
 *
 * Usage:
 *   const { selectedLaundryId, setSelectedLaundryId } = useSelectedLaundry();
 *   const laundry = useLaundriesStore(s => s.laundries.find(l => l.id === selectedLaundryId) ?? null);
 */

import { create } from 'zustand';

interface SelectedLaundryState {
  selectedLaundryId: number | null;
  setSelectedLaundryId: (id: number | null) => void;
  clearSelectedLaundry: () => void;
}

export const useSelectedLaundry = create<SelectedLaundryState>(set => ({
  selectedLaundryId: null,
  setSelectedLaundryId: id => set({ selectedLaundryId: id }),
  clearSelectedLaundry: () => set({ selectedLaundryId: null }),
}));
