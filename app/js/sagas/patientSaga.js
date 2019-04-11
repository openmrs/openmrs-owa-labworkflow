import {
  call,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {
  patientRest,
  encounterRest,
  orderRest,
} from '@openmrs/react-components';
import actionTypes, { FETCH_PATIENT_LAB_TEST_RESULTS } from '../actions/actionTypes';
import patientAction from '../actions/patientAction';
import { selectProperty } from '../utils/globalProperty';


function* getPatient(action) {
  try {
    const response = yield call(patientRest.getPatient, {
      patientUuid: action.payload.patientUuid,
    });
    if (response) {
      yield put(patientAction.getPatientSucceeded(response));
      yield put(patientAction.addPatient(response));
      yield put(patientAction.setSelectedPatient(response.uuid));
    }
  } catch (e) {
    yield put(patientAction.getPatientFailed(e.message));
  }
}

export function* patientSagas() {
  yield takeLatest(actionTypes.SET_PATIENT.REQUESTED, getPatient);
}

function* fetchAndSetTestResults(action) {
  const state = yield select();
  const { patientUUID } = action;
  try {
    const labResultsTestOrderType = selectProperty(state, 'labResultsTestOrderType');
    const encounterTypeUUID = selectProperty(state, 'labResultsEncounterType');
    const patientOrdersResponse = yield call(orderRest.fetchAllOrdersByPatient, patientUUID,
      labResultsTestOrderType);

    const patientEncountersResponse = yield call(
      encounterRest.fetchEncountersByPatient,
      patientUUID,
      encounterTypeUUID,
    );

    if (patientOrdersResponse && patientEncountersResponse) {
      if (patientOrdersResponse.results.length) {
        yield put(patientAction.setPatientData({
          meta: {
            orders: patientOrdersResponse.results.filter(order => order.action !== "DISCONTINUE"),
            encounters: patientEncountersResponse.results,
          },
          patientUUID,
        }));
      }
      yield put(patientAction.setPatientData({
        meta: {
          labResultFetchStatus: true,
        },
        patientUUID,
      }));
    }
  } catch (e) {
    yield put(patientAction.getPatientFailed(e.message));
  }
}

export function* fetchPatientTestResults() {
  yield takeEvery(FETCH_PATIENT_LAB_TEST_RESULTS, fetchAndSetTestResults);
}
