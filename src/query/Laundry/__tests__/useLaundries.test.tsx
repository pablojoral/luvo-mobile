import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useLaundriesList } from '../useLaundries';
import { laundryService } from 'services/api/services/LaundryService';
import { Laundry } from 'models/models';

jest.mock('services/api/services/LaundryService', () => ({
  laundryService: { list: jest.fn() },
}));

const mockList = laundryService.list as jest.Mock;

const mockLocation = {
  id: 1,
  address: '123 Main St',
  city: 'Madrid',
  state: null,
  country: 'ES',
  postalCode: null,
  latitude: '40.416775',
  longitude: '-3.703790',
  createdAt: new Date(),
};

const makeLaundry = (id: number, name = `Laundry ${id}`): Laundry => ({
  id,
  name,
  location: mockLocation,
  visibility: 'public',
  createdAt: new Date(),
});

// QueryClient is created once per test and held outside the wrapper component so
// that re-renders (e.g. when isSuccess flips) don't recreate the client and lose query state.
let qc: QueryClient;
beforeEach(() => {
  qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
});

function wrapper({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useLaundriesList', () => {
  beforeEach(() => jest.clearAllMocks());

  it('is in loading state initially', () => {
    mockList.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useLaundriesList(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns laundries sorted alphabetically by name', async () => {
    mockList.mockResolvedValue([makeLaundry(1, 'Zeta'), makeLaundry(2, 'Alpha'), makeLaundry(3, 'Mango')]);

    const { result } = renderHook(() => useLaundriesList(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data!.map(l => l.name)).toEqual(['Alpha', 'Mango', 'Zeta']);
  });

  it('surfaces errors when the API rejects', async () => {
    mockList.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useLaundriesList(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('returns empty array when API responds with no laundries', async () => {
    mockList.mockResolvedValue([]);

    const { result } = renderHook(() => useLaundriesList(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });
});
