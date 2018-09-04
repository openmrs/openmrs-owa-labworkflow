import configureMockStore from 'redux-mock-store';
import patientAction from '../../app/js/actions/patientAction';
import actionTypes from '../../app/js/actions/actionTypes';

const mockStore = configureMockStore();
const store = mockStore();

describe('Patient actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  it('should request for patient data', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT.REQUESTED,
      payload: {
        patientUuid: 'mockPatientUuid',
      },
    }];
    store.dispatch(patientAction.getPatientRecord('mockPatientUuid'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set patient data in the store', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT.SUCCEEDED,
      payload: 'mockPatientRecord',
    }];
    store.dispatch(patientAction.getPatientRecordSucceeded('mockPatientRecord'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set error messgage to store if fetching patient data fails', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT.FAILED,
      error: {
        message: 'mockErrorMessage',
      },
    }];
    store.dispatch(patientAction.getPatientRecordFailed('mockErrorMessage'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should request for patientNote data', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT_NOTE.REQUESTED,
      payload: {
        patientUuid: 'mockPatientUuid',
      },
    }];
    store.dispatch(patientAction.getPatientNote('mockPatientUuid'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set patientNote data in the store', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT_NOTE.SUCCEEDED,
      payload: 'mockPatientNoteRecord',
    }];
    store.dispatch(patientAction.getPatientNoteSucceeded('mockPatientNoteRecord'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set error messgage to store if fetching patientNote data fails', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT_NOTE.FAILED,
      error: {
        message: 'mockErrorMessage',
      },
    }];
    store.dispatch(patientAction.getPatientNoteFailed('mockErrorMessage'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
});
