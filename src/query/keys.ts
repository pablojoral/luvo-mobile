export const qk = {
  payments: {
    root:   ['payments'] as const,
    detail: (id: string) => ['payments', id] as const,
  },
  auth: {
    root: ['auth'] as const,
    me: () => ['auth', 'me'] as const,
    firebaseUser: () => ['auth', 'firebaseUser'] as const,
  },
  laundries: {
    root: ['laundries'] as const,
    list: (filter?: { search?: string }) => ['laundries', 'list', filter ?? {}] as const,
    infinite: (filter?: { search?: string }) => ['laundries', 'infinite', filter ?? {}] as const,
  },
  myLaundries: {
    root: ['myLaundries'] as const,
    list: (uid: string | null) => ['myLaundries', 'list', uid] as const,
  },
  accessCodes: {
    root: ['accessCodes'] as const,
    list: (laundryId: number) => ['accessCodes', laundryId, 'list'] as const,
  },
  settings: {
    root: ['settings'] as const,
    me:   () => ['settings', 'me'] as const,
  },
};
