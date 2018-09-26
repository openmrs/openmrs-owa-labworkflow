import initialState from './initialState';
import {
  FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  FETCH_LAB_RESULTS_DATE_CONCEPT,
  GET_DATE,
  FETCH_LAB_RESULTS_DID_NOT_PERFORM_ANSWER,
  FETCH_LAB_RESULTS_DID_NOT_PERFORM_QUESTION,
  FETCH_LAB_RESULTS_DID_NOT_PERFORM_REASON,
} from '../actions/actionTypes';


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

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_ANSWER}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        labResultsDidNotPerformAnswer: action.payload.data.results[0].value,
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_ANSWER}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_ANSWER}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_QUESTION}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        labResultsDidNotPerformQuestion: action.payload.data.results[0].value,
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_QUESTION}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_QUESTION}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_REASON}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        labResultsDidNotPerformReason: action.payload.data.results[0].value,
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_REASON}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }

    case `${FETCH_LAB_RESULTS_DID_NOT_PERFORM_REASON}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${FETCH_LAB_RESULTS_DATE_CONCEPT}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        labResultsDateConcept: action.payload.data.results[0].value,
      };
    }

    case `${FETCH_LAB_RESULTS_DATE_CONCEPT}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }

    case `${FETCH_LAB_RESULTS_DATE_CONCEPT}_LOADING`: {
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
