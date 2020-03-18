import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FactoryHandler } from '../../../redux/__tests__';
import createSubjectsCollection from '../collection';

const navigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
};

const factoryHandler = new FactoryHandler();

const mockStore = configureStore([thunk]);
let store;

beforeEach(() => {
  factoryHandler.reset();
});

describe('<SubjectsCollection>', () => {
  const SubjectsCollection = createSubjectsCollection(false);

  it('renders with basic props', async () => {
    await factoryHandler.factory.createMany('Subject', 3);

    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <SubjectsCollection navigation={navigation} />
      </Provider>,
    );
  });

  it('renders with fresh installation props', async () => {
    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <SubjectsCollection navigation={navigation} />
      </Provider>,
    );
  });
});


describe('<ArchivedSubjectsCollection>', () => {
  const ArchivedSubjectsCollection = createSubjectsCollection(true);

  it('renders with basic props', async () => {
    await factoryHandler.factory.createMany('Subject', 3);
    store = mockStore({
      entities: factoryHandler.session.state,
    });

    renderer.create(
      <Provider store={store}>
        <ArchivedSubjectsCollection navigation={navigation} />
      </Provider>,
    );
  });

  it('renders with fresh installation props', async () => {
    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <ArchivedSubjectsCollection navigation={navigation} />
      </Provider>,
    );
  });
});
