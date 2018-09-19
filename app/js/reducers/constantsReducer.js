import initialState from './initialState';
import { FETCH_LAB_RESULTS_ENCOUNTER_TYPE, GET_DATE } from '../actions/actionTypes';


export default (state = initialState.CONSTANTS, action) => {
  switch (action.type) {
    case `${FETCH_LAB_RESULTS_ENCOUNTER_TYPE}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        labResultsEncounterType: action.payload.data.results[0].value,
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

    case `${GET_DATE}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        dateAndTimeFormat: action.payload.data.results[0].value,
      };
    }
    case `${GET_DATE}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }
    case `${GET_DATE}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
