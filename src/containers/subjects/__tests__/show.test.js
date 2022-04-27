import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FactoryHandler } from '../../../redux/__tests__';
import SubjectShow from '../show';

/* global helperMockBuilders */

const factoryHandler = new FactoryHandler();

const mockStore = configureStore([thunk]);
let store;

beforeEach(() => {
  factoryHandler.reset();
});

describe('<SubjectShow>', () => {
  it('renders with basic props', async () => {
    const subject = await factoryHandler.factory.create('Subject');

    store = mockStore({
      entities: factoryHandler.session.state,
    });
    // REVIEW: is this a correct way of passing mocked params?
    renderer.create(
      <Provider store={store}>
        <SubjectShow
          navigation={helperMockBuilders.Navigation()}
          route={{
            params: {
              subjectId: subject.id,
            },
          }}
        />
      </Provider>,
    );
  });
});
