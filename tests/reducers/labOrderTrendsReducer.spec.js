import labTestResultsReducer from '../../app/js/reducers/labTestResultsReducer';
import initialState from '../../app/js/reducers/initialState';
import {
  FETCH_LAB_TEST_RESULTS,
} from '../../app/js/actions/actionTypes';


describe('labOrdersReducer', () => {
  it(`sets the apprioprate state after FETCH_LAB_TEST_RESULTS_LOADING is dispatched`, () => {
    const loadingAction = {
      type: `${FETCH_LAB_TEST_RESULTS}_LOADING`,
    };
    const nextState = labTestResultsReducer(initialState.labTestResultsReducer, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.results).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_TEST_RESULTS_SUCCESS is dispatched`, () => {
    const successAction = {
      type: `${FETCH_LAB_TEST_RESULTS}_SUCCESS`,
      payload: {
        data: {
          results: ['some valid result'],
        },
      },
    };
    const nextState = labTestResultsReducer(initialState.labTestResultsReducer, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.results).toEqual(successAction.payload.data.results);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_TEST_RESULTS_FAILURE is dispatched`, () => {
    const failedAction = {
      type: `${FETCH_LAB_TEST_RESULTS}_FAILURE`,
      error: true,
      payload: 'some akward error message',
    };
    const nextState = labTestResultsReducer(initialState.labTestResultsReducer, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.results).toEqual([]);
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = labTestResultsReducer(initialState.labTestResultsReducer, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.results).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
