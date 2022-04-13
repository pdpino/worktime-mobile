import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { Dashboard } from '../index';

/* global helperMockBuilders */

const factory = getFactory();

describe('<Dashboard>', () => {
  it('renders with basic props', async () => {
    const subjects = await factory.createMany('Subject', 3);
    const categories = await factory.createMany('Category', 3);

    renderer.create(
      <Dashboard
        {...helperMockBuilders.NavigationProps()}
        subjects={subjects}
        categories={categories}
      />,
    );
  });

  it('renders with empty props', async () => {
    renderer.create(
      <Dashboard
        {...helperMockBuilders.NavigationProps()}
        subjects={[]}
        categories={[]}
      />,
    );
  });
});
