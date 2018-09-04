import { call, put, takeLatest } from 'redux-saga/effects';
import patientHeaderApi from '../rest/patientHeaderRest';
import actionTypes from '../actions/actionTypes';
import patientAction from '../actions/patientAction';

function* getPatientRecord(action) {
  try {
    const response = yield call(patientHeaderApi.getPatientRecord, {
      patientUuid: action.payload.patientUuid,
    });
    if (response) {
      yield put(patientAction.getPatientRecordSucceeded(response));
    }
  } catch (e) {
    yield put(patientAction.getPatientRecordFailed(e.message));
  }
}

function* getPatientNote(action) {
  try {
    const response = yield call(patientHeaderApi.getPatientNote, {
      patientUuid: action.payload.patientUuid,
    });
    if (response.results.length > 0) {
      yield put(patientAction.getPatientNoteSucceeded(response.results[0]));
    }
  } catch (e) {
    yield put(patientAction.getPatientNoteFailed(e.message));
  }
}


function* patientSagas() {
  yield takeLatest(actionTypes.SET_PATIENT.REQUESTED, getPatientRecord);
  yield takeLatest(actionTypes.SET_PATIENT_NOTE.REQUESTED, getPatientNote);
}


export default patientSagas;
