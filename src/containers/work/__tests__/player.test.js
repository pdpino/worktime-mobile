import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { WorkPlayer } from '../player';

const navigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
};

const factory = getFactory();

describe('<WorkPlayer>', () => {
  it('renders with basic props', async () => {
    const runningSession = await factory.create('WorkSession');

    // TODO: add subjectsForPicker and other props?

    renderer.create(
      <WorkPlayer
        navigation={navigation}
        runningSession={runningSession}
      />,
    );
  });

  it('renders with fresh installation props', async () => {
    renderer.create(
      <WorkPlayer
        navigation={navigation}
        subjectsForPicker={[]}
        selectedSubject={null}
        runningSession={null}
        lastRunningSession={null}
      />,
    );
  });

  it('renders with no props present', async () => {
    renderer.create(
      <WorkPlayer
        navigation={navigation}
      />,
    );
  });
});
