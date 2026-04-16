import React from 'react';
import { render } from '@testing-library/react-native';

import { AvailabilityTag } from '../AvailabilityTag';
import { MachineStatus } from 'models/models';

// jest.mock factories are hoisted before imports — require everything inside
jest.mock('components/Tag/Tag', () => ({
  Tag: ({ children }: { children: React.ReactNode }) => {
    const R = require('react');
    const { Text } = require('react-native');
    return R.createElement(Text, null, children);
  },
}));

describe('AvailabilityTag', () => {
  const cases: { status: MachineStatus; expectedLabel: string }[] = [
    { status: 'available', expectedLabel: 'Disponible' },
    { status: 'in_use', expectedLabel: 'En uso' },
    { status: 'out_of_order', expectedLabel: 'Fuera de servicio' },
    { status: 'maintenance', expectedLabel: 'Mantenimiento' },
  ];

  cases.forEach(({ status, expectedLabel }) => {
    it(`renders "${expectedLabel}" for status "${status}"`, () => {
      const { getByText } = render(<AvailabilityTag status={status} />);
      expect(getByText(expectedLabel)).toBeTruthy();
    });
  });
});
