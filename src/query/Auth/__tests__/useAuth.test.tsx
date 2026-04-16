import React from 'react';
import { renderHook, waitFor, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useFirebaseAuthState, useMe, useSignOut } from '../useAuth';
import { authService } from 'services/api/services/AuthService';
import { AuthUser } from 'models/models';

jest.mock('services/api/services/AuthService', () => ({
  authService: { me: jest.fn(), logout: jest.fn() },
}));

// The manual mock lives at __mocks__/@react-native-firebase/auth.js
const mockAuth = require('@react-native-firebase/auth') as () => {
  onAuthStateChanged: jest.Mock;
};

function setAuthState(user: object | null) {
  mockAuth().onAuthStateChanged.mockImplementation((cb: (u: typeof user) => void) => {
    cb(user);
    return jest.fn(); // unsubscribe
  });
}

const mockMe = authService.me as jest.Mock;
const mockLogout = authService.logout as jest.Mock;

function makeWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return {
    qc,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    ),
  };
}

describe('useFirebaseAuthState', () => {
  beforeEach(() => jest.clearAllMocks());

  it('is loading before onAuthStateChanged fires', () => {
    mockAuth().onAuthStateChanged.mockImplementation(() => jest.fn()); // never calls cb
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useFirebaseAuthState(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns null when user is signed out', async () => {
    setAuthState(null);
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useFirebaseAuthState(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it('returns the user when signed in', async () => {
    const firebaseUser = { uid: 'abc123', email: 'user@example.com' };
    setAuthState(firebaseUser);
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useFirebaseAuthState(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(firebaseUser);
  });

  it('updates the cache when auth state changes', async () => {
    const firebaseUser = { uid: 'abc123', email: 'user@example.com' };
    setAuthState(firebaseUser);
    const { wrapper, qc } = makeWrapper();
    renderHook(() => useFirebaseAuthState(), { wrapper });
    await waitFor(() => expect(qc.getQueryData(['auth', 'firebaseUser'])).toEqual(firebaseUser));

    act(() => {
      // Simulate sign-out by triggering the subscription callback
      const [[subscriptionCb]] = mockAuth().onAuthStateChanged.mock.calls;
      subscriptionCb(null);
    });

    expect(qc.getQueryData(['auth', 'firebaseUser'])).toBeNull();
  });
});

describe('useMe', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns user data on success', async () => {
    const user: AuthUser = { id: 1, email: 'user@example.com', name: 'Test User' };
    mockMe.mockResolvedValue(user);

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(user);
  });

  it('does not fetch when enabled is false', () => {
    const { wrapper } = makeWrapper();
    renderHook(() => useMe({ enabled: false }), { wrapper });
    expect(mockMe).not.toHaveBeenCalled();
  });

  it('surfaces API errors', async () => {
    mockMe.mockRejectedValue(new Error('Unauthorized'));

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});

describe('useSignOut', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls authService.logout when mutate is triggered', async () => {
    mockLogout.mockResolvedValue(undefined);

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useSignOut(), { wrapper });

    await act(async () => { result.current.mutate(); });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('resets query cache after successful logout', async () => {
    mockLogout.mockResolvedValue(undefined);

    const { qc, wrapper } = makeWrapper();
    // Seed some cached data to verify it gets cleared
    qc.setQueryData(['auth', 'me'], { id: 1, email: 'user@example.com' });

    const { result } = renderHook(() => useSignOut(), { wrapper });
    await act(async () => { result.current.mutate(); });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(qc.getQueryData(['auth', 'me'])).toBeUndefined();
  });

  it('surfaces logout errors', async () => {
    mockLogout.mockRejectedValue(new Error('Server error'));

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useSignOut(), { wrapper });

    await act(async () => { result.current.mutate(); });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
  });
});
