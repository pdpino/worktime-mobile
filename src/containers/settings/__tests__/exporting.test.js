import React from 'react';
import renderer from 'react-test-renderer';

import { Exporting } from '../exporting';

describe('<Exporting>', () => {
  it('renders with no props', async () => {
    renderer.create(
      <Exporting />,
    );
  });
});
