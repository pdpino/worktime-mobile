import appReducer from '../app';

describe('app reducer', () => {
  it('Should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual({
      storeVersion: 0,
    });
  });

  it('Should update store version', () => {
    const updateTo1 = {
      type: 'APP/UPDATE_STORE_0_1',
      payload: {
        prevStoreVersion: 0,
        nextStoreVersion: 1,
      },
    };
    expect(appReducer(undefined, updateTo1)).toEqual({
      storeVersion: 1,
    });

    const updateTo7 = {
      type: 'APP/UPDATE_STORE_6_7',
      payload: {
        prevStoreVersion: 6,
        nextStoreVersion: 7,
      },
    };

    expect(appReducer(undefined, updateTo7)).toEqual({
      storeVersion: 7,
    });
  });

  it('Should update store version sequentially', () => {
    const actions = [
      {
        type: 'APP/UPDATE_STORE_2_3',
        payload: {
          prevStoreVersion: 2,
          nextStoreVersion: 3,
        },
      },
      {
        type: 'APP/UPDATE_STORE_3_4',
        payload: {
          prevStoreVersion: 3,
          nextStoreVersion: 4,
        },
      },
      {
        type: 'APP/UPDATE_STORE_4_5',
        payload: {
          prevStoreVersion: 4,
          nextStoreVersion: 5,
        },
      },
    ];
    const resultingState = actions.reduce(
      (state, action) => appReducer(state, action),
      { storeVersion: 2 },
    );

    expect(resultingState).toEqual({ storeVersion: 5 });
  });
});
