import labOrdersReducer from '../../app/js/reducers/labOrdersReducer';
import initialState from '../../app/js/reducers/initialState';
import {
  FETCH_LAB_ORDERS,
  SET_LAB_TEST,
  SET_LAB_RESULTS_ENCOUNTER,
  SET_LAB_ORDERS,
} from '../../app/js/actions/actionTypes';


describe('labOrdersReducer', () => {
  it(`sets the apprioprate state after FETCH_LAB_ORDERS_LOADING is dispatched`, () => {
    const loadingAction = {
      type: `${FETCH_LAB_ORDERS}_LOADING`,
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_ORDERS_SUCCESS is dispatched`, () => {
    const orders = [
      { orderNumber: 'ORD-1' },
      { orderNumber: 'ORD-2' },
      { orderNumber: 'ORD-3' },
    ];
    const successAction = {
      type: SET_LAB_ORDERS,
      orders,
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.orders).toEqual(orders);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state after FETCH_LAB_ORDERS_FAILURE is dispatched`, () => {
    const failedAction = {
      type: `${FETCH_LAB_ORDERS}_FAILURE`,
      error: true,
      payload: 'some akward error message',
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });
  it(`sets the apprioprate state for SET_LAB_TEST action type`, () => {
    const setLabTestsAction = {
      type: SET_LAB_TEST,
      testTypes: ['testType1', 'testType2'],
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, setLabTestsAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.labTests).toEqual(setLabTestsAction.testTypes);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
  it(`sets the apprioprate state for SET_LAB_RESULTS_ENCOUNTER action type`, () => {
    const action = {
      type: SET_LAB_RESULTS_ENCOUNTER,
      order: {
        uuid: 'some-order-uuid',
      },
      encounter: {
        uuid: 'some-encounter-uuid',
      },
    };
    const nextState = labOrdersReducer({
      ...initialState.labOrderReducer,
      orders: [{ uuid: 'some-order-uuid' }],
    }, action);
    expect(nextState.orders).toEqual([
      {
        uuid: 'some-order-uuid',
        labResult: {
          encounter: {
            uuid: 'some-encounter-uuid',
          },
        },
      },
    ]);
  });
  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = labOrdersReducer(initialState.labOrderReducer, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.orders).toEqual([]);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
