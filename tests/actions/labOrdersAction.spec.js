import {
  fetchLabTestResults,
  setLabTestTypes,
  setLabResultsEncounter,
  fetchLabOrders,
} from '../../app/js/actions/labOrdersAction';

import {
  FETCH_LAB_TEST_RESULTS,
  SET_LAB_TEST,
  SET_LAB_RESULTS_ENCOUNTER,
  FETCH_LAB_ORDERS,
} from '../../app/js/actions/actionTypes';

import mockOrders from '../../app/js/mockData/mockOrders.json';

const {
  moxios,
  mockStore,
} = global;

const mockOrder = mockOrders.data.results[0];

describe('fetchLabOrders action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should fetch lab orders', () => {
    const expectedActionTypes = [
      `${FETCH_LAB_ORDERS}_LOADING`,
    ];

    const store = mockStore({});
    store.dispatch(fetchLabOrders('lab-result-concept-uuid', {}));
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});

describe('setLabTestTypes action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should set lab test', () => {
    const expectedActionTypes = [
      SET_LAB_TEST,
    ];

    const store = mockStore({});
    store.dispatch(setLabTestTypes(['testType1', 'testType2']));
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});

describe('fetchLabTestResults action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should fetch lab test result trend test', () => {
    const expectedActionTypes = [
      `${FETCH_LAB_TEST_RESULTS}_LOADING`,
    ];

    const store = mockStore({});
    store.dispatch(fetchLabTestResults());
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});

describe('fetchLabTestResults action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should dispatch an action to set lab order encounter', () => {
    const expectedActionTypes = [
      `${SET_LAB_RESULTS_ENCOUNTER}_2`,
    ];

    const store = mockStore({});
    store.dispatch(setLabResultsEncounter(2, mockOrder));
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});
