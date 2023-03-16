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
} from '@openmrs/react-components';
import actionTypes, { FETCH_PATIENT_LAB_TEST_RESULTS } from '../actions/actionTypes';
import patientAction from '../actions/patientAction';
import { selectProperty } from '../utils/globalProperty';

const conceptRep = `(uuid,display,name,names,conceptClass:(uuid,display,name),datatype:(uuid,display,name),units)`;
const encounterRep = `(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),`
  + `obs:(id,uuid,value:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType)),`
  + `concept:${conceptRep},obsDatetime,comment,display,`
  + `groupMembers:(id,uuid,value:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType)),concept:${conceptRep},obsDatetime,comment,display,`
  + `groupMembers:(id,uuid,value:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType)),concept:${conceptRep},obsDatetime,comment,display,groupMembers)))`;

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
    const encounterTypeUUID = selectProperty(state, 'labResultsEntryEncounterType');
    const additionalEncounterTypeUUIDs = selectProperty(state, 'labResultsEncounterTypes');

    let encounterTypeUUIDs = [encounterTypeUUID];

    if (additionalEncounterTypeUUIDs) {
      encounterTypeUUIDs = [encounterTypeUUID, ...additionalEncounterTypeUUIDs
        .split(",")
        .filter((uuid) => uuid !== encounterTypeUUID)];
    }

    let encounters = [];

    // seems like yield cannot be nested in a reduce callback, so doing this the old-fashioned way
    for (let i = 0; i < encounterTypeUUIDs.length; i += 1) {
      const response = yield call(
        encounterRest.fetchEncountersByPatient,
        patientUUID,
        encounterTypeUUIDs[i],
        encounterRep,
      );

      if (response && response.results) {
        encounters = [...encounters, ...response.results];
      }
    }

    if (encounters.length !== 0) {
      yield put(patientAction.setPatientData({
        meta: {
          encounters,
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
  } catch (e) {
    yield put(patientAction.setPatientData({
      meta: {
        error: true,
        errorMessage: e.message,
      },
      patientUUID,
    }));
  }
}

export function* fetchPatientTestResults() {
  yield takeEvery(FETCH_PATIENT_LAB_TEST_RESULTS, fetchAndSetTestResults);
}
