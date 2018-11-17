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
});
