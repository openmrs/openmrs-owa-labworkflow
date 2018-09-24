import {
  call,
  take,
  takeEvery,
  fork,
  put,
  cancel,
} from 'redux-saga/effects';
import { conceptRest } from '@openmrs/react-components';

import { FETCH_LAB_CONCEPT, SET_CONCEPT_MEMBER } from '../actions/actionTypes';
import labConceptsAction from '../actions/labConceptsAction';


export function* getConcept({ concept, count }) {
  const { uuid } = concept;
  const response = yield call(conceptRest.getConcept, uuid);
  yield put(labConceptsAction.setMember(response, count));
}

export function* setConceptMembers(action) {
  const { payload: { data: { setMembers } } } = action;
  const members = setMembers;

  if (members.length) {
    let iterator = 0;
    let forkedProcess;
    yield put(labConceptsAction.setFetchStatus(true));
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
    yield put(labConceptsAction.setFetchStatus(false));
  }
}

export function* setLabConcepts() {
  yield takeEvery(`${FETCH_LAB_CONCEPT}_SUCCESS`, setConceptMembers);
}
