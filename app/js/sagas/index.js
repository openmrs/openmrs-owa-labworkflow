import { sagas as openmrsSagas } from '@openmrs/react-components';
import { labOrdersSaga } from './labOrdersSaga';
import patientSagas from './patientSaga';

const sagas = {
  openmrsSagas,
  patientSagas,
  labOrdersSaga,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
