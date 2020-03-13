import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { SubjectShow } from '../show';

// TODO: reuse navigation mock
const navigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
};

const factory = getFactory();

describe('<SubjectShow>', () => {
  it('renders with basic props', async () => {
    const subject = await factory.create('Subject');

    renderer.create(
      <SubjectShow
        navigation={navigation}
        subject={subject}
      />,
    );
  });
});
