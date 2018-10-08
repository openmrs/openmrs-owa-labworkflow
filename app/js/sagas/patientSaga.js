import {
  call,
  put,
  takeLatest,
  takeEvery,
  fork,
  take,
  cancel,
} from 'redux-saga/effects';
import { patientRest, constantsRest } from '@openmrs/react-components';
import actionTypes, { FETCH_PATIENT_LAB_TEST_RESULTS, SET_CONCEPT_MEMBER } from '../actions/actionTypes';
import patientAction from '../actions/patientAction';
import { getConcept } from './conceptsSaga';

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
  const { patientUUID } = action;
  try {
    const encounterTypeResponse = yield call(constantsRest.fetchLabResultsEncounterType);
    if (encounterTypeResponse) {
      const encounterUUID = encounterTypeResponse.results[0].value;
      const patientOrdersResponse = yield call(patientRest.getPatientLabOrders, patientUUID);
      const patientEncountersResponse = yield call(patientRest.getPatientEncounters, { patientUUID, encounterUUID });

      if (patientOrdersResponse && patientEncountersResponse) {
        console.log('patientEncountersResponse', patientEncountersResponse);
        console.log('patientOrdersResponse', patientOrdersResponse);
        if (patientOrdersResponse.results.length) {
          let iterator = 0;
          let forkedProcess;
          while (patientOrdersResponse.results[iterator]) {
            forkedProcess = yield fork(
              getConcept, { concept: patientOrdersResponse.results[iterator].concept, count: iterator },
            );
            iterator += 1;
          }
          const count = iterator - 1;
          yield take(`${SET_CONCEPT_MEMBER}_${count}`);
          yield cancel(forkedProcess);
          yield put(patientAction.updatePatientInfo({
            meta: {
              orders: patientOrdersResponse.results,
              encounters: patientEncountersResponse.results,
            },
            patientUUID,
          }));
        }
      }
    }
  } catch (e) {
    yield put(patientAction.getPatientFailed(e.message));
  }

}

export function* fetchPatientTestResults() {
  yield takeEvery(FETCH_PATIENT_LAB_TEST_RESULTS, fetchAndSetTestResults)
}

