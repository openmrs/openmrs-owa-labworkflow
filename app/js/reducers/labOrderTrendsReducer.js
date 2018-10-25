import initialState from './initialState';
import { FETCH_LAB_ORDER_TRENDS } from '../actions/actionTypes';


export default (state = initialState.labOrderTrendsReducer, action) => {
  switch (action.type) {
    case `${FETCH_LAB_ORDER_TRENDS}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        result: action.payload.data.results,
      };
    }
    case `${FETCH_LAB_ORDER_TRENDS}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }
    case `${FETCH_LAB_ORDER_TRENDS}_LOADING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
