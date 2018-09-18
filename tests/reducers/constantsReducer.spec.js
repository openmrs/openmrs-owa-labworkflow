import constantsReducer from '../../app/js/reducers/constantsReducer';
import initialState from '../../app/js/reducers/initialState';
import {
  FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  GET_DATE,
} from '../../app/js/actions/actionTypes';


describe('constantsReducer', () => {
  describe('FETCH_LAB_RESULTS_ENCOUNTER_TYPE Action', () => {
    it(`sets the apprioprate state after FETCH_LAB_RESULTS_ENCOUNTER_TYPE_LOADING is dispatched`, () => {
      const loadingAction = {
        type: `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_LOADING`,
      };
      const nextState = constantsReducer(initialState.CONSTANTS, loadingAction);
      expect(nextState.isLoading).toEqual(true);
      expect(nextState.labResultsEncounterType).toEqual('');
      expect(nextState.error.status).toEqual(false);
      expect(nextState.error.message).toEqual(null);
    });
    it(`sets the apprioprate state after FETCH_LAB_RESULTS_ENCOUNTER_TYPE_SUCCESS is dispatched`, () => {
      const successAction = {
        type: `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_SUCCESS`,
        payload: {
          data: {
            results: [
              {
                value: "some-valid-uuid",
              },
            ],
          },
        },
      };
      const nextState = constantsReducer(initialState.CONSTANTS, successAction);
      expect(nextState.isLoading).toEqual(false);
      expect(nextState.labResultsEncounterType).toEqual(successAction.payload.data.results[0].value);
      expect(nextState.error.status).toEqual(false);
      expect(nextState.error.message).toEqual(null);
    });
    it(`sets the apprioprate state after FETCH_LAB_RESULTS_ENCOUNTER_TYPE_FAILURE is dispatched`, () => {
      const failedAction = {
        type: `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_FAILURE`,
        error: true,
        payload: 'some akward error message',
      };
      const nextState = constantsReducer(initialState.CONSTANTS, failedAction);
      expect(nextState.isLoading).toEqual(false);
      expect(nextState.labResultsEncounterType).toEqual('');
      expect(nextState.error.status).toEqual(failedAction.error);
      expect(nextState.error.message).toEqual(failedAction.payload);
    });
  });

  describe('GET_DATE Action', () => {
    it(`sets the apprioprate state after GET_DATE_LOADING is dispatched`, () => {
      const loadingAction = {
        type: `${GET_DATE}_LOADING`,
      };
      const nextState = constantsReducer(initialState.CONSTANTS, loadingAction);
      expect(nextState.isLoading).toEqual(true);
      expect(nextState.dateAndTimeFormat).toEqual('');
      expect(nextState.error.status).toEqual(false);
      expect(nextState.error.message).toEqual(null);
    });
    it(`sets the apprioprate state after GET_DATE_SUCCESS is dispatched`, () => {
      const successAction = {
        type: `${GET_DATE}_SUCCESS`,
        payload: {
          data: {
            results: [
              {
                value: "some-valid-uuid",
              },
            ],
          },
        },
      };
      const nextState = constantsReducer(initialState.CONSTANTS, successAction);
      expect(nextState.isLoading).toEqual(false);
      expect(nextState.dateAndTimeFormat).toEqual(successAction.payload.data.results[0].value);
      expect(nextState.error.status).toEqual(false);
      expect(nextState.error.message).toEqual(null);
    });
    it(`sets the apprioprate state after GET_DATE_FAILURE is dispatched`, () => {
      const failedAction = {
        type: `${GET_DATE}_FAILURE`,
        error: true,
        payload: 'some akward error message',
      };
      const nextState = constantsReducer(initialState.CONSTANTS, failedAction);
      expect(nextState.isLoading).toEqual(false);
      expect(nextState.dateAndTimeFormat).toEqual('');
      expect(nextState.error.status).toEqual(failedAction.error);
      expect(nextState.error.message).toEqual(failedAction.payload);
    });
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = constantsReducer(initialState.CONSTANTS, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.labResultsEncounterType).toEqual('');
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
