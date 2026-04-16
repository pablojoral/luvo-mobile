/**
 * LaundrySocketService — manages the WebSocket connection to ws://…/ws/laundries
 *
 * Handles:
 *   • Connect / disconnect lifecycle
 *   • Exponential-backoff reconnection (1s → 30s max)
 *   • JSON message parsing and typed dispatch
 *   • Forwards `snapshot` and `machine_update` events to the caller via callbacks
 */

import { MachineDelta, WsConnectionState } from 'stores/useLaundriesStore';
import { Laundry } from 'models/models';

// ── WS message shapes (server → client) ──────────────────────────────────────

export type SnapshotMessage = {
  type: 'snapshot';
  laundries: Laundry[];
};

export type MachineUpdateMessage = {
  type: 'machine_update';
  laundryId: number;
  machine: MachineDelta;
};

export type WsMessage = SnapshotMessage | MachineUpdateMessage;

// ── Callbacks ─────────────────────────────────────────────────────────────────

export interface LaundrySocketCallbacks {
  onSnapshot: (laundries: Laundry[]) => void;
  onMachineUpdate: (laundryId: number, machine: MachineDelta) => void;
  onStateChange: (state: WsConnectionState) => void;
}

// ── Service ───────────────────────────────────────────────────────────────────

const RECONNECT_BASE_MS = 1_000;
const RECONNECT_MAX_MS = 30_000;

export class LaundrySocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectDelay = RECONNECT_BASE_MS;
  private intentionalClose = false;
  private url: string;
  private callbacks: LaundrySocketCallbacks;

  constructor(url: string, callbacks: LaundrySocketCallbacks) {
    this.url = url;
    this.callbacks = callbacks;
  }

  connect(): void {
    this.intentionalClose = false;
    this.reconnectDelay = RECONNECT_BASE_MS;
    this._open();
  }

  disconnect(): void {
    this.intentionalClose = true;
    this._clearReconnect();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.callbacks.onStateChange('idle');
  }

  updateUrl(url: string): void {
    this.url = url;
  }

  // ── Private ──────────────────────────────────────────────────────────────────

  private _open(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.callbacks.onStateChange('connecting');

    try {
      this.ws = new WebSocket(this.url);
    } catch (err) {
      if (__DEV__) console.warn('[WS] connection error:', err);
      this.callbacks.onStateChange('error');
      this._scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.reconnectDelay = RECONNECT_BASE_MS;
      if (__DEV__) console.log('[WS] connected:', this.url);
      this.callbacks.onStateChange('connected');
    };

    this.ws.onmessage = (event: WebSocketMessageEvent) => {
      let msg: WsMessage;
      try {
        msg = JSON.parse(event.data as string);
      } catch {
        if (__DEV__) console.warn('[WS] malformed message:', event.data);
        return;
      }
      if (__DEV__) console.log('[WS ←]', msg.type, msg);
      this._dispatch(msg);
    };

    this.ws.onerror = err => {
      if (__DEV__) console.warn('[WS] error:', err);
      this.callbacks.onStateChange('error');
    };

    this.ws.onclose = event => {
      this.ws = null;
      if (__DEV__) console.log('[WS] closed — code:', event.code, 'intentional:', this.intentionalClose);
      if (!this.intentionalClose) {
        this.callbacks.onStateChange('reconnecting');
        this._scheduleReconnect();
      }
    };
  }

  private _dispatch(msg: WsMessage): void {
    switch (msg.type) {
      case 'snapshot':
        this.callbacks.onSnapshot(msg.laundries);
        break;
      case 'machine_update':
        this.callbacks.onMachineUpdate(msg.laundryId, msg.machine);
        break;
    }
  }

  private _scheduleReconnect(): void {
    this._clearReconnect();
    this.reconnectTimer = setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, RECONNECT_MAX_MS);
      this._open();
    }, this.reconnectDelay);
  }

  private _clearReconnect(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}
