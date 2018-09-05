/*eslint-disable*/
import R from 'ramda';
import { take, put } from 'redux-saga/effects';
import {
  FETCH_LAB_ORDERS
} from '../actions/actionTypes'
import { setLabTestTypes } from '../actions/labOrdersAction';

export function* setLabTestsSaga () {
  const { payload } = yield take(`${FETCH_LAB_ORDERS}_SUCCESS`);

  const labTestTypes = R.compose(
    R.uniq,
    R.map(R.path(['concept','display'])),
    )(payload.results);

  yield put(setLabTestTypes(labTestTypes));
}
