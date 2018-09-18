import {
  call,
  take,
  fork,
  put,
} from 'redux-saga/effects';

import { FETCH_LAB_CONCEPTS } from '../actions/actionTypes';
import labConceptsAction from '../actions/labConceptsAction';

import conceptRest from '../rest/concept';

export function* loadSetMemebers(member) {
  const { uuid } = member;
  const response = yield call(conceptRest.getSetMembers, uuid);
  yield put(labConceptsAction.setMembers(response));
}

export function* setLabConcepts() {
  const { payload: { data: { setMembers, answers } } } = yield take(`${FETCH_LAB_CONCEPTS}_SUCCESS`);

  if (setMembers.length) {
    yield setMembers.map(member => fork(loadSetMemebers, member));
  }
}
