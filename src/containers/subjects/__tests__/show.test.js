import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { SubjectShow } from '../show';

/* global helperMockBuilders */

const factory = getFactory();

describe('<SubjectShow>', () => {
  it('renders with basic props', async () => {
    const subject = await factory.create('Subject');

    renderer.create(
      <SubjectShow
        {...helperMockBuilders.NavigationProps()}
        subject={subject}
      />,
    );
  });
});
