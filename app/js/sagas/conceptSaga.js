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
  FETCH_LAB_CATEGORIES_SET,
} from '../actions/actionTypes';

import {
  setMember, setFetchStatus, setLabCategoriestSet,
} from '../actions/labConceptsAction';
import { CONCEPT_REP } from '../actions/constantsAction';

export function* getConcept({ concept, count }) {
  const { uuid } = concept;
  const response = yield call(conceptRest.getConcept, uuid, CONCEPT_REP);
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
        forkedProcess = yield fork(getConcept, { concept: members[iterator], count: iterator });
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

export function* fetchAndSetLabCategoriesSet(action) {
  const { conceptUuid } = action;

  const CONCEPT_SET_REP = 'custom:(id,uuid,display,setMembers:(id,uuid,display,names:(uuid,name,locale,localePreferred,voided,conceptNameType),set,setMembers:(id,uuid,display))';

  try {
    const response = yield call(conceptRest.getConcept, conceptUuid, CONCEPT_SET_REP);

    // keep the categorized concept
    const concepts = response.setMembers;

    // but also flatten the concept set to a set of uuids to use as a top-level filter
    let conceptsFlattened  = []
    Object.assign(conceptsFlattened, concepts);

    while (conceptsFlattened.some((c) => c.set)) {
      conceptsFlattened = conceptsFlattened.flatMap((c) => (c.set ? [...c.setMembers, {
        uuid: c.uuid,
        set: false,
        conceptClass: c.conceptClass,
      }] : c));
    }

    // create a set for easy lookup
    const conceptSetFlattened = new Set();
    conceptsFlattened.forEach((c) => conceptSetFlattened.add(c.uuid));

    yield put(setLabCategoriestSet(concepts, conceptSetFlattened));
  } catch (e) {
    console.log("failed to retrieve the laboratory categories");
  }
}

export function* fetchLabCategoriesSet() {
  yield takeEvery(
    FETCH_LAB_CATEGORIES_SET,
    fetchAndSetLabCategoriesSet,
  );
}
