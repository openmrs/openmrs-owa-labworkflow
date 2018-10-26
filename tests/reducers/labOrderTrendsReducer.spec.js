import labOrderTrendsReducer from '../../app/js/reducers/labOrderTrendsReducer';
import initialState from '../../app/js/reducers/initialState';
import {
  FETCH_LAB_ORDER_TRENDS,
} from '../../app/js/actions/actionTypes';


describe('labOrdersReducer', () => {
  it(`sets the apprioprate state after FETCH_LAB_ORDER_TRENDS_LOADING is dispatched`, () => {
    const loadingAction = {
      type: `${FETCH_LAB_ORDER_TRENDS}_LOADING`,
    };
    const nextState = labOrderTrendsReducer(initialState.labOrderTrendsReducer, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.result).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_ORDER_TRENDS_SUCCESS is dispatched`, () => {
    const successAction = {
      type: `${FETCH_LAB_ORDER_TRENDS}_SUCCESS`,
      payload: {
        data: {
          results: ['some valid result'],
        },
      },
    };
    const nextState = labOrderTrendsReducer(initialState.labOrderTrendsReducer, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.result).toEqual(successAction.payload.data.results);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_ORDER_TRENDS_FAILURE is dispatched`, () => {
    const failedAction = {
      type: `${FETCH_LAB_ORDER_TRENDS}_FAILURE`,
      error: true,
      payload: 'some akward error message',
    };
    const nextState = labOrderTrendsReducer(initialState.labOrderTrendsReducer, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.result).toEqual([]);
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = labOrderTrendsReducer(initialState.labOrderTrendsReducer, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.result).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
