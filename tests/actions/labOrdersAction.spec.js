import { fetchLabTestResults, setLabTestTypes } from '../../app/js/actions/labOrdersAction';

import {
  FETCH_LAB_TEST_RESULTS,
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
