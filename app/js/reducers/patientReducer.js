import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.patientReducer, action) => {
  switch (action.type) {
    case actionTypes.SET_PATIENT.SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        patient: action.payload,
      };
    case actionTypes.SET_PATIENT.REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SET_PATIENT.FAILED:
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