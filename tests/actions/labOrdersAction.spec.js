import { fetchLabOrders, setLabTestTypes } from '../../app/js/actions/labOrdersAction';

import {
  FETCH_LAB_ORDERS,
  SET_LAB_TEST,
} from '../../app/js/actions/actionTypes';

const {
  moxios,
  mockStore,
} = global;


describe('fetchLabOrders action', () => {  
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
