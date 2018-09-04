import patientNoteReducer from '../../app/js/reducers/patientNoteReducer';
import initialState from '../../app/js/reducers/initialState';
import actionTypes from '../../app/js/actions/actionTypes';


describe('patientNoteReducer', () => {
  it(`sets the apprioprate state after actionTypes.SET_PATIENT_NOTE.REQUESTED is dispatched`, () => {
    const loadingAction = {
      type: actionTypes.SET_PATIENT_NOTE.REQUESTED,
      payload: {
        patientUuid: 'mockUuid',
      },
    };
    const nextState = patientNoteReducer(initialState.patientNoteReducer, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.patientNote).toEqual({});
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after SET_PATIENT_NOTE.SUCCEEDED is dispatched`, () => {
    const successAction = {
      type: actionTypes.SET_PATIENT_NOTE.SUCCEEDED,
      payload: {
        results: ['some valid result'],
      },
    };
    const nextState = patientNoteReducer(initialState.patientNoteReducer, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patientNote).toEqual(successAction.payload);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after actionTypes.SET_PATIENT_NOTE.FAILED is dispatched`, () => {
    const failedAction = {
      type: actionTypes.SET_PATIENT_NOTE.FAILED,
      error: true,
      payload: 'some error message',
    };
    const nextState = patientNoteReducer(initialState.patientNoteReducer, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patientNote).toEqual({});
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = patientNoteReducer(initialState.patientNoteReducer, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patientNote).toEqual({});
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
