import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FactoryHandler } from '../../../redux/__tests__';
import TimeChart from '../index';

/* global helperMockBuilders */

const factoryHandler = new FactoryHandler();
const mockStore = configureStore([thunk]);
let store;

beforeEach(() => {
  factoryHandler.reset();
});

describe('<TimeChart>', () => {
  describe('When there is data', () => {
    it('renders with some work sessions in the DB', async () => {
      await factoryHandler.factory.createMany('Subject', 3);
      await factoryHandler.factory.createMany('WorkSession', 10);

      store = mockStore({
        entities: factoryHandler.session.state,
      });

      renderer.create(
        <Provider store={store}>
          <TimeChart {...helperMockBuilders.NavigationProps()} />
        </Provider>,
      );
    });

    it('renders with subjects and also categories', async () => {
      await factoryHandler.factory.createMany('Category', 2);
      await factoryHandler.factory.createMany('Subject', 7);
      await factoryHandler.factory.createMany('WorkSession', 200);

      store = mockStore({
        entities: factoryHandler.session.state,
      });

      renderer.create(
        <Provider store={store}>
          <TimeChart {...helperMockBuilders.NavigationProps()} />
        </Provider>,
      );
    });
  });

  describe('When there is no data', () => {
    it('renders with unpopulated DB', async () => {
      store = mockStore({
        entities: factoryHandler.session.state,
      });

      renderer.create(
        <Provider store={store}>
          <TimeChart {...helperMockBuilders.NavigationProps()} />
        </Provider>,
      );
    });

    it('renders with empty store', async () => {
      store = mockStore({});

      renderer.create(
        <Provider store={store}>
          <TimeChart {...helperMockBuilders.NavigationProps()} />
        </Provider>,
      );
    });
  });
});
