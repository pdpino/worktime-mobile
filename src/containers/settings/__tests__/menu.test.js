import React from 'react';
import renderer from 'react-test-renderer';

import { SettingsMenu } from '../menu';

describe('<SettingsMenu>', () => {
  it('renders with no props', async () => {
    renderer.create(
      <SettingsMenu />,
    );
  });
});
