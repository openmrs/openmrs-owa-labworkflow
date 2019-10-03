import { sagas as openmrsSagas } from '@openmrs/react-components';
import { patientSagas, fetchPatientTestResults } from './patientSaga';
import {
  setLabTestsSaga,
  clear,
  resetState,
  setEncounters,
  cancelOrder,
  saveFulfillerStatus,
} from './labOrdersSaga';
import { setLabConcepts, fetchConcept } from './conceptSaga';
import { clearFormFieldsSaga } from './formSaga';

const sagas = {
  setLabTestsSaga,
  openmrsSagas,
  patientSagas,
  clear,
  resetState,
  fetchPatientTestResults,
  setLabConcepts,
  fetchConcept,
  setEncounters,
  cancelOrder,
  clearFormFieldsSaga,
  saveFulfillerStatus,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
