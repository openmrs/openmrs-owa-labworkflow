import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultPatient, action) => {
  switch (action.type) {
    case actionTypes.SET_PATIENT.SUCCEEDED:
      return {
        ...state,
        patient: action.payload,
      };
    default: return state;
  }
};