import { sagas as openmrsSagas } from '@openmrs/react-components';
import { labOrdersSaga } from './labOrdersSaga';

const sagas = {
  labOrdersSaga,
  openmrsSagas,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
