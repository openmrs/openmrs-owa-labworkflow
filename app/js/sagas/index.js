import { sagas as openmrsSagas } from '@openmrs/react-components';
import { patientSagas, fetchPatientTestResults } from './patientSaga';
import { setLabTestsSaga, clear, resetState } from './labOrdersSaga';
import { fetchConcept } from './conceptSaga';

const sagas = {
  setLabTestsSaga,
  openmrsSagas,
  patientSagas,
  clear,
  resetState,
  fetchPatientTestResults,
  fetchConcept,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
