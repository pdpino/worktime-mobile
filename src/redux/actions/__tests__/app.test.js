import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('checkStoreVersion', () => {
  it('Dispatches sequential UPDATE_STORE actions', () => {
    const storeVersionNeeded = 3;
    const storeVersionCurrent = 0;

    const expectedActions = [
      {
        type: 'APP/UPDATE_STORE_0_1',
        payload: {
          prevStoreVersion: 0,
          nextStoreVersion: 1,
        },
      },
      {
        type: 'APP/UPDATE_STORE_1_2',
        payload: {
          prevStoreVersion: 1,
          nextStoreVersion: 2,
        },
      },
      {
        type: 'APP/UPDATE_STORE_2_3',
        payload: {
          prevStoreVersion: 2,
          nextStoreVersion: 3,
        },
      },
    ];
    const store = mockStore({
      app: {
        storeVersion: storeVersionCurrent,
      },
    });

    return store.dispatch(actions.checkStoreVersion(
      storeVersionNeeded,
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Dispatches nothing if up to date', () => {
    const storeVersionNeeded = 7;
    const storeVersionCurrent = 7;

    const store = mockStore({
      app: {
        storeVersion: storeVersionCurrent,
      },
    });

    return store.dispatch(actions.checkStoreVersion(
      storeVersionNeeded,
    )).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
});
