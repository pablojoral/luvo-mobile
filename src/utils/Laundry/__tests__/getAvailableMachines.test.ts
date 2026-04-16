import { getAvailableMachines } from '../getAvailableMachines';
import { Laundry, Machine } from 'models/models';

const makeMachine = (id: number, overrides: Partial<Machine> = {}): Machine => ({
  id,
  laundryId: 1,
  name: `Machine ${id}`,
  type: 'washing_machine',
  status: 'available',
  modelNumber: null,
  createdAt: new Date(),
  ...overrides,
});

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

const makeLaundry = (machines?: Machine[]): Laundry => ({
  id: 1,
  name: 'Test Laundry',
  location: mockLocation,
  visibility: 'public',
  machines,
  createdAt: new Date(),
});

describe('getAvailableMachines', () => {
  it('returns zeros for null laundry', () => {
    expect(getAvailableMachines(null)).toEqual({ total: 0, available: 0, occupied: 0 });
  });

  it('returns zeros when laundry has no machines relation', () => {
    expect(getAvailableMachines(makeLaundry(undefined))).toEqual({
      total: 0,
      available: 0,
      occupied: 0,
    });
  });

  it('returns zeros for empty machines array', () => {
    expect(getAvailableMachines(makeLaundry([]))).toEqual({
      total: 0,
      available: 0,
      occupied: 0,
    });
  });

  it('counts all machines as available when all are available', () => {
    const machines = [
      makeMachine(1, { status: 'available' }),
      makeMachine(2, { status: 'available' }),
    ];
    expect(getAvailableMachines(makeLaundry(machines))).toEqual({
      total: 2,
      available: 2,
      occupied: 0,
    });
  });

  it('treats in_use, out_of_order, and maintenance all as occupied', () => {
    const machines = [
      makeMachine(1, { status: 'available' }),
      makeMachine(2, { status: 'in_use' }),
      makeMachine(3, { status: 'out_of_order' }),
      makeMachine(4, { status: 'maintenance' }),
    ];
    expect(getAvailableMachines(makeLaundry(machines))).toEqual({
      total: 4,
      available: 1,
      occupied: 3,
    });
  });

  it('occupied is never negative', () => {
    const machines = [makeMachine(1, { status: 'available' })];
    const { occupied } = getAvailableMachines(makeLaundry(machines));
    expect(occupied).toBeGreaterThanOrEqual(0);
  });
});
