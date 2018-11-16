import initialState from './initialState';
import { FETCH_LAB_ORDERS, SET_LAB_TEST } from '../actions/actionTypes';

export default (state = initialState.labOrderReducer, action) => {
  switch (action.type) {
    case `${FETCH_LAB_ORDERS}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        orders: action.payload.data.results,
      };
    }
    case `${FETCH_LAB_ORDERS}_FAILURE`: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    }
    case `${FETCH_LAB_ORDERS}_LOADING`: {
      return {
        ...state,
        fetched: false,
        isLoading: true,
      };
    }

    case SET_LAB_TEST: {
      return {
        ...state,
        labTests: action.testTypes,
        fetched: true,
      };
    }

    default:
      return state;
  }
};
