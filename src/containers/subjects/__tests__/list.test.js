import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FactoryHandler } from '../../../redux/__tests__';
import createSubjectsList from '../list';

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

describe('<SubjectsList>', () => {
  const SubjectsList = createSubjectsList(false);

  it('renders with basic props', async () => {
    await factoryHandler.factory.createMany('Subject', 3);

    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <SubjectsList navigation={navigation} />
      </Provider>,
    );
  });

  it('renders with fresh installation props', async () => {
    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <SubjectsList navigation={navigation} />
      </Provider>,
    );
  });
});


describe('<ArchivedSubjectsList>', () => {
  const ArchivedSubjectsList = createSubjectsList(true);

  it('renders with basic props', async () => {
    await factoryHandler.factory.createMany('Subject', 3);
    store = mockStore({
      entities: factoryHandler.session.state,
    });

    renderer.create(
      <Provider store={store}>
        <ArchivedSubjectsList navigation={navigation} />
      </Provider>,
    );
  });

  it('renders with fresh installation props', async () => {
    store = mockStore({
      entities: factoryHandler.session.state,
    });
    renderer.create(
      <Provider store={store}>
        <ArchivedSubjectsList navigation={navigation} />
      </Provider>,
    );
  });
});
