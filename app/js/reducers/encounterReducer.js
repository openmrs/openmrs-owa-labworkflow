import initialState from './initialState';
// import { FETCH_LAB_ORDERS, SET_LAB_TEST } from '../actions/actionTypes';


export default (state = initialState.encounter, action) => {
  switch (action.type) {
    case `FETCH_PATIENT_ENCOUNTER_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        obs: action.payload.results,
      };
    }
    case `FETCH_PATIENT_ENCOUNTER_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }
    case `FETCH_PATIENT_ENCOUNTER_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
