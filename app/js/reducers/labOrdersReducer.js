import initialState from './initialState';
import {
  FETCH_LAB_ORDERS,
  SET_LAB_TEST,
  SET_LAB_RESULTS_ENCOUNTER,
  SET_ORDER_LIST_FETCH_STATUS,
  SET_LAB_ORDERS,
} from '../actions/actionTypes';

export default (state = initialState.labOrderReducer, action) => {
  switch (action.type) {
    case SET_LAB_RESULTS_ENCOUNTER: {
      const filteredOrders = state.orders.map((order) => {
        if (order.uuid === action.order.uuid) {
          return {
            ...order,
            labResult: {
              encounter: action.encounter,
            },
          };
        }
        return order;
      });
      return {
        ...state,
        orders: filteredOrders,
      };
    }
    case SET_LAB_ORDERS: {
      return {
        ...state,
        isLoading: false,
        fetched: true,
        orders: action.orders,
        totalCount: action.totalCount,
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
      };
    }

    case SET_ORDER_LIST_FETCH_STATUS: {
      return {
        ...state,
        fetched: action.status,
      };
    }

    default:
      return state;
  }
};
