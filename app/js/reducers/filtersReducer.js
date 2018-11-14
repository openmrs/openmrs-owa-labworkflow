import initialState from './initialState';
import { SET_LAB_RESULTS_FILTERS } from '../actions/actionTypes';

export default (state = initialState.filtersReducer, action) => {
  switch (action.type) {
    case SET_LAB_RESULTS_FILTERS: {
      return {
        ...state,
        labResultListFilters: action.filters,
      };
    }

    default:
      return state;
  }
};
