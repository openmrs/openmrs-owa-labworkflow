import R from 'ramda';
import { take, takeEvery, put } from 'redux-saga/effects';
import {
  FETCH_LAB_ORDERS,
} from '../actions/actionTypes'
import { setLabTestTypes } from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';


export function* clear() {
  yield put(setSelectedConcept());
}

export function* resetState() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, clear)
}

export function* setLabTestsSaga() {
  const { payload } = yield take(`${FETCH_LAB_ORDERS}_SUCCESS`);

  const labTestTypes = R.compose(
    R.uniq,
    R.map(R.path(['concept','display'])),
    )(payload.data.results);

  yield put(setLabTestTypes(labTestTypes));
}
