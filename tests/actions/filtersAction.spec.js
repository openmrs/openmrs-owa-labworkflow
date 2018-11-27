import configureMockStore from 'redux-mock-store';
import filtersAction from '../../app/js/actions/filtersAction';
import actionTypes, { SET_LAB_RESULTS_FILTERS, SET_LAB_ORDERS_LIST_FILTERS } from '../../app/js/actions/actionTypes';

const mockStore = configureMockStore();
const store = mockStore();


describe('Patient actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should set lab result list filters', () => {
    const mockFilters = {
      dateToField: '12/2/2018',
      dateFromField: '11/2/2018',
    };
    const expectedActions = [{
      type: SET_LAB_RESULTS_FILTERS,
      filters: mockFilters,
    }];
    store.dispatch(filtersAction.setLabResultListFilters(mockFilters));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set lab order list filters', () => {
    const mockFilters = {
      nameField: "",
      dateToField: '12/2/2018',
      dateFromField: '11/2/2018',
      testTypeField: "All",
      testStatusField: "All",
    };
    const expectedActions = [{
      type: SET_LAB_ORDERS_LIST_FILTERS,
      filters: mockFilters,
    }];
    store.dispatch(filtersAction.setLabOrdersListFilters(mockFilters));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
});
