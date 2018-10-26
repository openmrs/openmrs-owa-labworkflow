import { fetchLabOrdersTrends, setLabTestTypes } from '../../app/js/actions/labOrdersAction';

import {
  FETCH_LAB_ORDER_TRENDS,
  SET_LAB_TEST,
} from '../../app/js/actions/actionTypes';

const {
  moxios,
  mockStore,
} = global;


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

describe('fetchLabOrdersTrends action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should fetch lab orders trend test', () => {
    const expectedActionTypes = [
      `${FETCH_LAB_ORDER_TRENDS}_LOADING`,
    ];

    const store = mockStore({});
    store.dispatch(fetchLabOrdersTrends());
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});
