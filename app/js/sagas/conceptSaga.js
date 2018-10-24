/*eslint-disable */
import { take, put, call, takeEvery } from 'redux-saga/effects';
import { conceptRest } from '@openmrs/react-components';
import {
  FETCH_CONCEPT,
  FETCH_CONCEPT_SUCCEEDED,
  FETCH_CONCEPT_FAILED,
} from '../actions/actionTypes';


export function* fetchAndSetConcept(action) {
  const { conceptUUID } = action;
  try {
    const response = yield call (conceptRest.getConcept, conceptUUID);
    if(response) {
      yield put({
        type: FETCH_CONCEPT_SUCCEEDED,
        data: response,
        conceptUUID,
      });
    }
  } catch (e) {
    yield put({
      type: FETCH_CONCEPT_FAILED,
      error: e,
      conceptUUID
    });
  }
}

export function* fetchConcept() {
  yield takeEvery(FETCH_CONCEPT, fetchAndSetConcept);
}
