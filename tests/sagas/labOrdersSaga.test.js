import { labOrdersSaga } from '../../app/js/sagas/labOrdersSaga';
import { FETCH_LAB_ORDERS } from '../../app/js/actions/actionTypes';

let sagaTester;

const { SagaTester } = global;

describe('labOrdersSaga', () => {
  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(labOrdersSaga);
  });
  it('should run', () => {

    expect(sagaTester.getCalledActions()).toEqual([]);
    expect(sagaTester.wasCalled(FETCH_LAB_ORDERS)).toEqual(false);
    sagaTester.dispatch({ type: FETCH_LAB_ORDERS });
    expect(sagaTester.wasCalled(FETCH_LAB_ORDERS)).toEqual(true);
  });
}); 