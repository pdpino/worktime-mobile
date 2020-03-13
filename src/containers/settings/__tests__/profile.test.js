import React from 'react';
import renderer from 'react-test-renderer';

import { Profile } from '../profile';
import profileReducer from '../../../redux/reducers/profile';

describe('<Profile>', () => {
  it('renders with fresh install props', async () => {
    const initialProfile = profileReducer(undefined, {});

    renderer.create(
      <Profile
        profile={initialProfile}
      />,
    );
  });
});
