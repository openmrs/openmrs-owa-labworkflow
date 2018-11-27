import configureMockStore from 'redux-mock-store';
import patientAction from '../../app/js/actions/patientAction';
import actionTypes, { ADD_PATIENT, SET_PATIENT_DATA, FETCH_PATIENT_LAB_TEST_RESULTS } from '../../app/js/actions/actionTypes';

const mockStore = configureMockStore();
const store = mockStore();

describe('Patient actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should request for patient data', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT.REQUESTED,
      payload: {
        patientUuid: 'mockPatientUuid',
      },
    }];
    store.dispatch(patientAction.getPatient('mockPatientUuid'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set patient data in the store', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT.SUCCEEDED,
      payload: 'mockPatientRecord',
    }];
    store.dispatch(patientAction.getPatientSucceeded('mockPatientRecord'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set error messgage to store if fetching patient data fails', () => {
    const expectedActions = [{
      type: actionTypes.SET_PATIENT.FAILED,
      error: {
        message: 'mockErrorMessage',
      },
    }];
    store.dispatch(patientAction.getPatientFailed('mockErrorMessage'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should dispatch an action to add a patient to the store', () => {
    const mockPatient = {
      uuid: 'some-patient-uuid',
      display: {
        name: "rowland"
      },
    };
    const expectedActions = [{
      type: ADD_PATIENT,
      patient: mockPatient,
    }];
    store.dispatch(patientAction.addPatient(mockPatient));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it(`should dispatch an action to fetch a patient's lab result`, () => {
    const patientUUID = 'some-patient-uuid';
    const expectedActions = [{
      type: FETCH_PATIENT_LAB_TEST_RESULTS,
      patientUUID,
    }];
    store.dispatch(patientAction.fetchPatientLabTestResults(patientUUID));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it(`should set the patient's data in store`, () => {
    const patientInfo = {
      uuid: 'some-patient-uuid',
      display: {
        name: 'rowland',
      },
    };
    const expectedActions = [{
      type: SET_PATIENT_DATA,
      ...patientInfo,
    }];
    store.dispatch(patientAction.setPatientData(patientInfo));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
});
