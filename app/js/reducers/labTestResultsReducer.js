import initialState from './initialState';
import { FETCH_LAB_TEST_RESULTS } from '../actions/actionTypes';


export default (state = initialState.labTestResultsReducer, action) => {
  switch (action.type) {
    case `${FETCH_LAB_TEST_RESULTS}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        results: action.payload.data.results,
      };
    }
    case `${FETCH_LAB_TEST_RESULTS}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }
    case `${FETCH_LAB_TEST_RESULTS}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
