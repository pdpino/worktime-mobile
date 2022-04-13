import React from 'react';
import renderer from 'react-test-renderer';

import { WeekView } from '../index';

/* global helperMockBuilders */

describe('<WeekView>', () => {
  it('renders with no props', async () => {
    renderer.create(
      <WeekView {...helperMockBuilders.NavigationProps()} />,
    );
  });

  it('renders with empty work sessions', async () => {
    renderer.create(
      <WeekView
        {...helperMockBuilders.NavigationProps()}
        workSessions={[]}
      />,
    );
  });
});
