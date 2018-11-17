import { patientSagas } from '../../app/js/sagas/patientSaga';
import actionTypes from '../../app/js/actions/actionTypes';

let sagaTester;

const { SagaTester } = global;

describe('patientSaga', () => {
  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(patientSagas);
  });

  it('should run getPatientRecord() saga', () => {
    expect(sagaTester.getCalledActions()).toEqual([]);
    expect(sagaTester.wasCalled(actionTypes.SET_PATIENT.REQUESTED)).toEqual(false);
    sagaTester.dispatch({ type: actionTypes.SET_PATIENT.REQUESTED });
    expect(sagaTester.wasCalled(actionTypes.SET_PATIENT.REQUESTED)).toEqual(true);
  });
});