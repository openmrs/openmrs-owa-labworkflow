import { fetchLabOrders } from '../../app/js/actions/labOrdersAction';

import {
  FETCH_LAB_ORDERS,
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
});
