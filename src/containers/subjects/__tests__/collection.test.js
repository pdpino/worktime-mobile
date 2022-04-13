import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FactoryHandler } from '../../../redux/__tests__';
import {
  NonArchivedSubjects as SubjectsCollection,
  ArchivedSubjects as ArchivedSubjectsCollection,
} from '../collection';

/* global helperMockBuilders */

const factoryHandler = new FactoryHandler();

const mockStore = configureStore([thunk]);
let store;

beforeEach(() => {
  factoryHandler.reset();
});

describe('<SubjectsCollection>', () => {
  it('renders with basic props', async () => {
    await factoryHandler.factory.createMany('Subject', 3);

    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <SubjectsCollection {...helperMockBuilders.NavigationProps()} />
      </Provider>,
    );
  });

  it('renders with fresh installation props', async () => {
    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <SubjectsCollection {...helperMockBuilders.NavigationProps()} />
      </Provider>,
    );
  });
});

describe('<ArchivedSubjectsCollection>', () => {
  it('renders with basic props', async () => {
    await factoryHandler.factory.createMany('Subject', 3);
    store = mockStore({
      entities: factoryHandler.session.state,
    });

    renderer.create(
      <Provider store={store}>
        <ArchivedSubjectsCollection {...helperMockBuilders.NavigationProps()} />
      </Provider>,
    );
  });

  it('renders with fresh installation props', async () => {
    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <ArchivedSubjectsCollection {...helperMockBuilders.NavigationProps()} />
      </Provider>,
    );
  });
});
