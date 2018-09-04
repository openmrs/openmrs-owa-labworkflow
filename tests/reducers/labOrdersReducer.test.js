import labOrdersReducer from '../../app/js/reducers/labOrdersReducer';
import initialState from '../../app/js/reducers/initialState';
import {
  FETCH_LAB_ORDERS,
} from '../../app/js/actions/actionTypes';


describe('labOrdersReducer', () => {
  it(`sets the apprioprate state after FETCH_LAB_ORDERS_LOADING is dispatched`, () => {
    const loadingAction = {
      type: `${FETCH_LAB_ORDERS}_LOADING`,
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_ORDERS_SUCCESS is dispatched`, () => {
    const successAction = {
      type: `${FETCH_LAB_ORDERS}_SUCCESS`,
      payload: {
        results: ['some valid result'],
      },
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.orders).toEqual(successAction.payload.results);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_ORDERS_FAILURE is dispatched`, () => {
    const failedAction = {
      type: `${FETCH_LAB_ORDERS}_FAILURE`,
      error: true,
      payload: 'some akward error message',
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
