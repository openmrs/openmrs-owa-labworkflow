import R from 'ramda';
import { take, takeEvery, put } from 'redux-saga/effects';
import {
  FETCH_LAB_ORDERS,
} from '../actions/actionTypes';
import { setLabTestTypes } from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';


export function* clear() {
  yield put(setSelectedConcept());
}

export function* resetState() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, clear);
}

export function* setTestTypes(action) {
  const { payload } = action;

  const labTestTypes = R.compose(
    R.uniq,
    R.map(R.path(['concept', 'display'])),
  )(payload.data.results);

  yield put(setLabTestTypes(labTestTypes));
}

export function* setLabTestsSaga() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, setTestTypes);
}
