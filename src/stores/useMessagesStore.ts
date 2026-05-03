import { create } from 'zustand';

export interface AppMessage {
  id: string;
  title?: string;
  body: string;
  onDismiss?: () => void;
}

interface MessagesState {
  messages: AppMessage[];
  currentIndex: number;
  addMessage: (msg: Omit<AppMessage, 'id'>) => void;
  next: () => void;
  prev: () => void;
  dismiss: () => void;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  messages: [],
  currentIndex: 0,

  addMessage: (msg) =>
    set(s => ({
      messages: [...s.messages, { ...msg, id: Math.random().toString(36).slice(2) }],
    })),

  next: () =>
    set(s => ({
      currentIndex: Math.min(s.currentIndex + 1, s.messages.length - 1),
    })),

  prev: () =>
    set(s => ({
      currentIndex: Math.max(s.currentIndex - 1, 0),
    })),

  dismiss: () => {
    const { currentIndex, messages } = get();
    if (currentIndex < messages.length - 1) return; // only dismissible on last
    messages.forEach(m => m.onDismiss?.());
    set({ messages: [], currentIndex: 0 });
  },
}));
