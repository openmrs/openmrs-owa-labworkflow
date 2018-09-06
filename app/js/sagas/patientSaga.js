import { call, put, takeLatest } from 'redux-saga/effects';
import { patientRest } from '@openmrs/react-components';
import actionTypes from '../actions/actionTypes';
import patientAction from '../actions/patientAction';

function* getPatient(action) {
  try {
    const response = yield call(patientRest.getPatient, {
      patientUuid: action.payload.patientUuid,
    });
    if (response) {
      yield put(patientAction.getPatientSucceeded(response));
    }
  } catch (e) {
    yield put(patientAction.getPatientFailed(e.message));
  }
}

function* patientSagas() {
  yield takeLatest(actionTypes.SET_PATIENT.REQUESTED, getPatient);
}


export default patientSagas;
