import R from 'ramda';
import initialState from './initialState';
import {
  FETCH_LAB_ORDERS,
  SET_LAB_TEST,
  SET_ORDER_LAB_ENCOUNTER,
  SET_ORDER_LIST_FETCH_STATUS,
  SET_LAB_ORDERS,
} from '../actions/actionTypes';


export default (state = initialState.labOrderReducer, action) => {
  if (action.type.includes(SET_ORDER_LAB_ENCOUNTER)) {
    const filteredOrders = state.orders.map((item) => {
      if (item.uuid === action.order.uuid) {
        return action.order;
      }
      return item;
    });
    return {
      ...state,
      orders: filteredOrders,
    };
  }
  switch (action.type) {
    case SET_LAB_ORDERS: {
      return {
        ...state,
        isLoading: false,
        fetched: true,
        orders: action.orders,
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
