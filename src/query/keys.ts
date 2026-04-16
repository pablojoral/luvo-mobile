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
};
