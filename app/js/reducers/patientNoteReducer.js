import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.patientNoteReducer, action) => {
  switch (action.type) {
    case actionTypes.SET_PATIENT_NOTE.SUCCEEDED:
      return {
        ...state,
        patientNote: action.payload,
      };
    case actionTypes.SET_PATIENT_NOTE.REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SET_PATIENT_NOTE.FAILED:
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    default: return state;
  }
};