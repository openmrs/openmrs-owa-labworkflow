import filtersReducer from '../../app/js/reducers/filtersReducer';
import initialState from '../../app/js/reducers/initialState';
import { SET_LAB_RESULTS_FILTERS, SET_LAB_ORDERS_LIST_FILTERS } from '../../app/js/actions/actionTypes';


describe('filtersReducer', () => {
  it(`sets the apprioprate filter for labResultListFilters`, () => {
    const loadingAction = {
      type: SET_LAB_RESULTS_FILTERS,
      filters: {
        dateToField: '2018-10-9',
        dateFromField: '2018-10-1',
      },
    };
    const nextState = filtersReducer(initialState.filtersReducer, loadingAction);
    expect(nextState.labResultListFilters.dateFromField).toEqual('2018-10-1');
    expect(nextState.labResultListFilters.dateToField).toEqual('2018-10-9');
  });
  it(`sets the apprioprate filter for labOrdersListFilters`, () => {
    const loadingAction = {
      type: SET_LAB_ORDERS_LIST_FILTERS,
      filters: {
        dateToField: '2018-10-9',
        dateFromField: '2018-10-1',
      },
    };
    const nextState = filtersReducer(initialState.filtersReducer, loadingAction);
    expect(nextState.labOrdersListFilters.dateFromField).toEqual('2018-10-1');
    expect(nextState.labOrdersListFilters.dateToField).toEqual('2018-10-9');
  });
});
