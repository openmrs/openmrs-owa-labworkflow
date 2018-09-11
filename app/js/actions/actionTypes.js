import types from 'redux-types';

const BASIC_TYPES = [
  'SUCCEEDED',
  'FAILED',
  'REQUESTED',
];

export default {
  SET_PATIENT: types('set_patient', BASIC_TYPES),
};
export const FETCH_LAB_ORDERS = 'FETCH_LAB_ORDERS';
export const SET_LAB_TEST = 'SET_LAB_TEST';
