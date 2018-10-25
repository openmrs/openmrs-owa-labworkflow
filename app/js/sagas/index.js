import { sagas as openmrsSagas } from '@openmrs/react-components';
import { patientSagas, fetchPatientTestResults } from './patientSaga';
import { setLabTestsSaga, clear, resetState } from './labOrdersSaga';
import { setLabConcepts, fetchConcept } from './conceptSaga';

const sagas = {
  setLabTestsSaga,
  openmrsSagas,
  patientSagas,
  clear,
  resetState,
  fetchPatientTestResults,
  setLabConcepts,
  fetchConcept,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
