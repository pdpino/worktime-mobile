import React from 'react';
import renderer from 'react-test-renderer';

import { getFactory } from '../../../redux/__tests__';
import { WorkPlayer } from '../player';

/* global helperMockBuilders */

const factory = getFactory();

describe('<WorkPlayer>', () => {
  it('renders with basic props', async () => {
    const runningSession = await factory.create('WorkSession');

    // TODO: add subjectsForPicker and other props?

    renderer.create(
      <WorkPlayer
        {...helperMockBuilders.NavigationProps()}
        runningSession={runningSession}
      />,
    );
  });

  it('renders with fresh installation props', async () => {
    renderer.create(
      <WorkPlayer
        {...helperMockBuilders.NavigationProps()}
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
        {...helperMockBuilders.NavigationProps()}
      />,
    );
  });
});
