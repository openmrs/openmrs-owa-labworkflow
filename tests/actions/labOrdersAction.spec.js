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
  
  it('should fetch lab orders successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          results: [{}, {}, {}],
        },
      });
    });

    const expectedActionTypes = [
      `${FETCH_LAB_ORDERS}_LOADING`,
      `${FETCH_LAB_ORDERS}_SUCCESS`,
    ];

    const store = mockStore({});
    return store.dispatch(fetchLabOrders())
      .then(() => {
        const dispatchedActions = store.getActions();
        const dispatchedActionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActionTypes).toEqual(expectedActionTypes);
      });
  });
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
