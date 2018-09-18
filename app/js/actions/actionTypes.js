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
export const SET_SELECTED_PATIENT = 'SET_SELECTED_PATIENT';
export const ADD_PATIENT = 'ADD_PATIENT';
export const FETCH_LAB_CONCEPTS = 'FETCH_LAB_CONCEPTS';
export const FETCH_LAB_RESULTS_ENCOUNTER_TYPE = 'FETCH_LAB_RESULTS_ENCOUNTER_TYPE';
