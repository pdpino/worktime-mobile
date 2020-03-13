import React from 'react';
import renderer from 'react-test-renderer';

import { Importing } from '../importing';
import profileReducer from '../../../redux/reducers/profile';

describe('<Importing>', () => {
  it('renders with fresh install props', async () => {
    const initialProfile = profileReducer(undefined, {});

    renderer.create(
      <Importing
        profile={initialProfile}
      />,
    );
  });
});
