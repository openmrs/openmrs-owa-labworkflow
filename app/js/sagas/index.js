import { sagas as openmrsSagas } from '@openmrs/react-components';
import patientSagas from './patientSaga';
import { setLabTestsSaga } from './labOrdersSaga';
import { setLabConcepts } from './conceptsSaga';

const sagas = {
  setLabTestsSaga,
  openmrsSagas,
  patientSagas,
  setLabConcepts,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
