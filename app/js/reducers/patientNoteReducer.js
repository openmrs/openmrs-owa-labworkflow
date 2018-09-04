import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultNote.results, action) => {
  switch (action.type) {
    case actionTypes.SET_PATIENT_NOTE.SUCCEEDED:
      return {
        ...state,
        patientNote: action.payload,
      };
    default: return state;
  }
};