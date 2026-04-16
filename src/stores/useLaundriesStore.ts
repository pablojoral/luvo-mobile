import { create } from 'zustand';

import { Laundry, MachineStatus } from 'models/models';

export type WsConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error';

export interface MachineDelta {
  id: number;
  status: MachineStatus;
  cycleRemainingSeconds: number;
  errorCode: number;
  commError: boolean;
}

interface LaundriesStore {
  laundries: Laundry[];
  connectionState: WsConnectionState;
  // Actions
  setSnapshot: (laundries: Laundry[]) => void;
  updateMachine: (laundryId: number, delta: MachineDelta) => void;
  setConnectionState: (state: WsConnectionState) => void;
}

export const useLaundriesStore = create<LaundriesStore>(set => ({
  laundries: [],
  connectionState: 'idle',

  setSnapshot: laundries => set({ laundries }),

  updateMachine: (laundryId, delta) =>
    set(state => ({
      laundries: state.laundries.map(laundry => {
        if (laundry.id !== laundryId) return laundry;
        return {
          ...laundry,
          machines: (laundry.machines ?? []).map(m =>
            m.id === delta.id
              ? {
                  ...m,
                  status:                delta.status,
                  cycleRemainingSeconds: delta.cycleRemainingSeconds,
                  errorCode:             delta.errorCode,
                  commError:             delta.commError,
                }
              : m,
          ),
        };
      }),
    })),

  setConnectionState: connectionState => set({ connectionState }),
}));
