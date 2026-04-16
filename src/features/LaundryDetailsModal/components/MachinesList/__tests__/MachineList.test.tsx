import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { MachinesList } from '../MachineList';
import { Laundry, Machine } from 'models/models';

// jest.mock factories are hoisted before imports — require everything inside

jest.mock('../theme/useMachinesListTheme', () => ({
  useMachinesListTheme: () => ({
    styles: {
      containerStyle: {},
      typeSelectorContainer: {},
      listContentContainerStyle: {},
      separatorStyle: {},
    },
  }),
}));

// Renders machine name as testable text
jest.mock('components/MachineCard/MachineCard', () => ({
  MachineCard: ({ machine }: { machine: Machine }) => {
    const R = require('react');
    const { Text } = require('react-native');
    return R.createElement(Text, { testID: `machine-${machine.id}` }, machine.name);
  },
}));

// Renders pill buttons that call onChange
jest.mock('components/PillSelector/PillSelector', () => ({
  PillSelector: ({
    options,
    onChange,
  }: {
    options: { label: string; value: string }[];
    onChange: (v: string) => void;
  }) => {
    const R = require('react');
    const { View, Text, TouchableOpacity } = require('react-native');
    return R.createElement(
      View,
      null,
      ...options.map((opt: { label: string; value: string }) =>
        R.createElement(
          TouchableOpacity,
          { key: opt.value, testID: `pill-${opt.value}`, onPress: () => onChange(opt.value) },
          R.createElement(Text, null, opt.label),
        ),
      ),
    );
  },
}));

const makeMachine = (id: number, type: Machine['type'], status: Machine['status'] = 'available'): Machine => ({
  id,
  laundryId: 1,
  name: `Machine ${id}`,
  type,
  status,
  modelNumber: null,
  createdAt: new Date(),
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

const makeLaundry = (machines: Machine[]): Laundry => ({
  id: 1,
  name: 'Test Laundry',
  location: mockLocation,
  visibility: 'public',
  machines,
  createdAt: new Date(),
});

describe('MachinesList', () => {
  const machines: Machine[] = [
    makeMachine(1, 'washing_machine'),
    makeMachine(2, 'washing_machine'),
    makeMachine(3, 'dryer'),
  ];
  const laundry = makeLaundry(machines);

  it('shows all machines by default', () => {
    const { getByTestId } = render(<MachinesList laundry={laundry} />);
    expect(getByTestId('machine-1')).toBeTruthy();
    expect(getByTestId('machine-2')).toBeTruthy();
    expect(getByTestId('machine-3')).toBeTruthy();
  });

  it('filters to washing machines when Lavadoras pill is pressed', () => {
    const { getByTestId, queryByTestId } = render(<MachinesList laundry={laundry} />);

    fireEvent.press(getByTestId('pill-washing_machine'));

    expect(getByTestId('machine-1')).toBeTruthy();
    expect(getByTestId('machine-2')).toBeTruthy();
    expect(queryByTestId('machine-3')).toBeNull(); // dryer hidden
  });

  it('filters to dryers when Secadoras pill is pressed', () => {
    const { getByTestId, queryByTestId } = render(<MachinesList laundry={laundry} />);

    fireEvent.press(getByTestId('pill-dryer'));

    expect(getByTestId('machine-3')).toBeTruthy();
    expect(queryByTestId('machine-1')).toBeNull(); // washer hidden
    expect(queryByTestId('machine-2')).toBeNull(); // washer hidden
  });

  it('shows all machines again after switching back to Todas', () => {
    const { getByTestId } = render(<MachinesList laundry={laundry} />);

    fireEvent.press(getByTestId('pill-dryer'));
    fireEvent.press(getByTestId('pill-all'));

    expect(getByTestId('machine-1')).toBeTruthy();
    expect(getByTestId('machine-2')).toBeTruthy();
    expect(getByTestId('machine-3')).toBeTruthy();
  });

  it('renders nothing in the list when laundry has no machines', () => {
    const { queryByTestId } = render(<MachinesList laundry={makeLaundry([])} />);
    expect(queryByTestId('machine-1')).toBeNull();
  });

  it('renders nothing when laundry is null', () => {
    const { queryByTestId } = render(<MachinesList laundry={null} />);
    expect(queryByTestId('machine-1')).toBeNull();
  });
});
