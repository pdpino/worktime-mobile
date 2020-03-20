import React from 'react';
import renderer from 'react-test-renderer';

import { WeekView } from '../index';

const navigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
};

describe('<WeekView>', () => {
  it('renders with no props', async () => {
    renderer.create(
      <WeekView navigation={navigation} />,
    );
  });

  it('renders with empty work sessions', async () => {
    renderer.create(
      <WeekView
        navigation={navigation}
        workSessions={[]}
      />,
    );
  });
});
