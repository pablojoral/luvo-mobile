import { Laundry } from 'models/models';

export const getAvailableMachines = (laundry: Laundry | null) => {
  if (!laundry) return { total: 0, available: 0, occupied: 0 };

  const total = laundry.machines?.length ?? 0;
  const available = laundry.machines?.filter(m => m.status === 'available').length ?? 0;
  const occupied = Math.max(0, total - available);

  return { total, available, occupied };
};
