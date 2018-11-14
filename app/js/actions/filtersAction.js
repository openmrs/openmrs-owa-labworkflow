import {
  SET_LAB_RESULTS_FILTERS,
} from './actionTypes';

const setLabResultListFilters = filters => ({
  type: SET_LAB_RESULTS_FILTERS,
  filters,
});

export default {
  setLabResultListFilters,
};
