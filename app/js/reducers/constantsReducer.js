import initialState from './initialState';
import { FETCH_LAB_RESULTS_ENCOUNTER_TYPE } from '../actions/actionTypes';


export default (state = initialState.CONSTANTS, action) => {
  switch (action.type) {
    case `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        labResultsEncounterType: action.payload.results[0].value,
      };
    }
    case `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }
    case `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
