import initialState from './initialState';
import { SET_LAB_RESULTS_FILTERS, SET_LAB_ORDERS_LIST_FILTERS } from '../actions/actionTypes';

export default (state = initialState.filtersReducer, action) => {
  switch (action.type) {
    case SET_LAB_RESULTS_FILTERS: {
      return {
        ...state,
        labResultListFilters: action.filters,
      };
    }

    case SET_LAB_ORDERS_LIST_FILTERS: {
      return {
        ...state,
        labOrdersListFilters: action.filters,
      };
    }

    default:
      return state;
  }
};
