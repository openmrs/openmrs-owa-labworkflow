import {
  SET_LAB_RESULTS_FILTERS,
  SET_LAB_ORDERS_LIST_FILTERS,
} from './actionTypes';

const setLabResultListFilters = (filters) => ({
  type: SET_LAB_RESULTS_FILTERS,
  filters,
});

const setLabOrdersListFilters = (filters) => ({
  type: SET_LAB_ORDERS_LIST_FILTERS,
  filters,
});

export default {
  setLabResultListFilters,
  setLabOrdersListFilters,
};
