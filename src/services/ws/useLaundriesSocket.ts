/**
 * useLaundriesSocket — manages the LaundrySocketService lifecycle
 *
 * • Builds the WS URL from Config.API_BASE_URL (http→ws, https→wss).
 * • Appends ?token=<firebaseIdToken> so the server can optionally authenticate.
 * • Wires snapshot / machine_update callbacks into useLaundriesStore.
 * • Reconnects when the Firebase token changes (e.g. after re-login).
 * • Cleans up on unmount.
 *
 * Call this once at app level (Navigator) — not inside individual screens.
 */

import { useEffect, useRef } from 'react';

import Config from 'react-native-config';

import { getIdToken } from 'services/firebase/firebaseAuth';
import { LaundrySocketService } from './LaundrySocketService';
import { useLaundriesStore } from 'stores/useLaundriesStore';

function buildWsUrl(token: string | null): string {
  const base = (Config.API_BASE_URL ?? 'http://localhost:3000')
    .replace(/^https:\/\//, 'wss://')
    .replace(/^http:\/\//, 'ws://');
  const path = `${base}/ws/laundries`;
  return token ? `${path}?token=${encodeURIComponent(token)}` : path;
}

export function useLaundriesSocket(): void {
  const serviceRef = useRef<LaundrySocketService | null>(null);

  const setSnapshot = useLaundriesStore(s => s.setSnapshot);
  const updateMachine = useLaundriesStore(s => s.updateMachine);
  const setConnectionState = useLaundriesStore(s => s.setConnectionState);

  useEffect(() => {
    let active = true;

    const init = async () => {
      // Best-effort: attach token if the user is already signed in
      const token = await getIdToken().catch(() => null);
      if (!active) return;

      const url = buildWsUrl(token);

      const service = new LaundrySocketService(url, {
        onSnapshot: setSnapshot,
        onMachineUpdate: updateMachine,
        onStateChange: setConnectionState,
      });

      serviceRef.current = service;
      service.connect();
    };

    init();

    return () => {
      active = false;
      serviceRef.current?.disconnect();
      serviceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
