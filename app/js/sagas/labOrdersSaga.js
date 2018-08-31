/*eslint-disable*/
import { take } from 'redux-saga/effects';
import {
  FETCH_LAB_ORDERS
} from '../actions/actionTypes'

export function* labOrdersSaga () {
  const { payload } = yield take(`${FETCH_LAB_ORDERS}_SUCCESS`);
  // do something with data from this payload like 
  // fork a process and fetch avialable patient data or something
}
