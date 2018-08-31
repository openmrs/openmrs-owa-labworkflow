import initialState from './initialState';
import { FETCH_LAB_ORDERS } from '../actions/actionTypes';


export default (state = initialState.labOrderReducer, action) => {
  switch (action.type) {
    case `${FETCH_LAB_ORDERS}_SUCCESS`: {
      return {
        ...state,
        isLoading: false,
        orders: action.payload.results,
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
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
