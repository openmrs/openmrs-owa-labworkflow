import types from 'redux-types';

const BASIC_TYPES = [
  'SUCCEEDED',
  'FAILED',
  'REQUESTED',
];

export const FETCH_LAB_ORDERS = 'FETCH_LAB_ORDERS';

export default {
  SET_PATIENT: types('set_patient', BASIC_TYPES),
  SET_PATIENT_NOTE: types('set_patient_note', BASIC_TYPES),
};
