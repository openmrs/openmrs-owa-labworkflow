import patientReducer from '../../app/js/reducers/patientReducer';
import initialState from '../../app/js/reducers/initialState';
import actionTypes from '../../app/js/actions/actionTypes';


describe('patientReducer', () => {
  it(`sets the apprioprate state after actionTypes.SET_PATIENT.REQUESTED is dispatched`, () => {
    const loadingAction = {
      type: actionTypes.SET_PATIENT.REQUESTED,
    };
    const nextState = patientReducer(initialState.patientReducer, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.patient).toEqual(initialState.patientReducer.patient);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after SET_PATIENT.SUCCEEDED is dispatched`, () => {
    const successAction = {
      type: actionTypes.SET_PATIENT.SUCCEEDED,
      payload: {
        results: ['some valid result'],
      },
    };
    const nextState = patientReducer(initialState.patientReducer, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patient).toEqual(successAction.payload);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after actionTypes.SET_PATIENT.FAILED is dispatched`, () => {
    const failedAction = {
      type: actionTypes.SET_PATIENT.FAILED,
      error: true,
      payload: 'some error message',
    };
    const nextState = patientReducer(initialState.patientReducer, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patient).toEqual(initialState.patientReducer.patient);
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = patientReducer(initialState.patientReducer, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patient).toEqual(initialState.patientReducer.patient);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
