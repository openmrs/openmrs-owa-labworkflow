import {
  call,
  take,
  takeEvery,
  fork,
  put,
  cancel,
} from 'redux-saga/effects';
import { conceptRest } from '@openmrs/react-components';

import {
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  FETCH_CONCEPT,
  FETCH_CONCEPT_SUCCEEDED,
  FETCH_CONCEPT_FAILED,
} from '../actions/actionTypes';
import { setMember, setFetchStatus } from '../actions/labConceptsAction';


export function* getConcept({ concept, count }) {
  const { uuid } = concept;
  const response = yield call(conceptRest.getConcept, uuid);
  yield put(setMember(response, count));
}

export function* setConceptMembers(action) {
  const { payload: { data: { setMembers } } } = action;
  const members = setMembers;

  if (members.length) {
    let iterator = 0;
    let forkedProcess;
    yield put(setFetchStatus(true));
    try {
      while (members[iterator]) {
        forkedProcess = yield fork(
          getConcept, { concept: members[iterator], count: iterator },
        );
        iterator += 1;
      }
    } finally {
      const count = iterator - 1;
      yield take(`${SET_CONCEPT_MEMBER}_${count}`);
      yield cancel(forkedProcess);
    }
    yield put(setFetchStatus(false));
  }
}

export function* setLabConcepts() {
  yield takeEvery(`${FETCH_LAB_CONCEPT}_SUCCESS`, setConceptMembers);
}

export function* fetchAndSetConcept(action) {
  const { conceptUUID } = action;
  try {
    const response = yield call(conceptRest.getConcept, conceptUUID);
    if (response) {
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
      conceptUUID,
    });
  }
}

export function* fetchConcept() {
  yield takeEvery(FETCH_CONCEPT, fetchAndSetConcept);
}
