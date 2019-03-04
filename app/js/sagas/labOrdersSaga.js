import R from 'ramda';
import {
  take,
  takeEvery,
  put,
  cancel,
  fork,
  call,
  select,
} from 'redux-saga/effects';
import {
  encounterRest,
} from '@openmrs/react-components';
import {
  FETCH_LAB_ORDERS,
  UPDATE_LAB_ORDER_WITH_ENCOUNTER,
  SET_ORDER_LAB_ENCOUNTER,
  SET_ORDER_LIST_FETCH_STATUS,
} from '../actions/actionTypes';
import { setLabTestTypes, setOrderLabEncounter } from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';

const computeResultStatus = (encounter, constants) => {
  const concealedConceptUUIDs = [
    constants.labResultsTestOrderNumberConcept,
    constants.labResultsTestLocationQuestion,
    constants.labResultsDateConcept,
    constants.labResultsDidNotPerformReasonQuestion,
    constants.labResultsEstimatedCollectionDateQuestion,
    constants.labResultsDidNotPerformQuestion,
  ];
  if (encounter) {
    const hasObs = !R.isNil(encounter.obs);
    if (hasObs) {
      const obs = R.pipe(
        R.filter(item => !concealedConceptUUIDs.includes(item.concept.uuid)),
      )(encounter.obs);

      if (!R.isEmpty(obs)) {
        return "Reported";
      }
      return "Taken";
    }
  }
  return "Ordered";
};


export function* clear() {
  yield put(setSelectedConcept());
}

export function* resetState() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, clear);
}

export function* setTestTypes(action) {
  const { payload } = action;

  const labTestTypes = R.compose(
    R.uniq,
    R.map(R.path(['concept', 'display'])),
  )(payload.data.results);

  yield put(setLabTestTypes(labTestTypes));
}

export function* setLabTestsSaga() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, setTestTypes);
}

export function* fetchAndSetTestResultEncounter(args) {
  const state = yield select();
  const { order, count = -1 } = args;
  const patientUUID = order.patient.uuid;
  const encounterTypeUUID = state.openmrs.CONSTANTS.labResultsEncounterType;
  try {
    const encounterResponse = yield call(
      encounterRest.fetchEncountersByPatient,
      patientUUID,
      encounterTypeUUID,
    );

    const encounters = encounterResponse.results;

    const matchedEncounter = encounters.filter((encounter) => {
      const testOrderObs = encounter.obs.filter(
        item => item.concept.uuid === state.openmrs.CONSTANTS.labResultsTestOrderNumberConcept,
      );
      const testOrderNumber = testOrderObs[0].value;
      const matched = testOrderNumber === order.orderNumber;
      return matched;
    });

    const orderWithEncounter = {
      ...order,
      labResult: {
        encounter: matchedEncounter[0] || null,
        resultStatus: computeResultStatus(
          matchedEncounter[0] || null,
          state.openmrs.CONSTANTS,
        ),
      },
    };

    yield put(setOrderLabEncounter(count, orderWithEncounter));
  } catch (error) {
    yield put({ type: "FETCH_LAB_ORDERS_FAILURE", payload: error, error: true });
  }
}

export function* fetchEncounters(action) {
  const { payload } = action;
  const orders = payload.data.results;
  let iterator = 0;
  let forkedProcess;
  try {
    while (orders[iterator]) {
      forkedProcess = yield fork(
        fetchAndSetTestResultEncounter, { order: orders[iterator], count: iterator },
      );
      iterator += 1;
    }
  } finally {
    const count = iterator - 1;
    yield take(`${SET_ORDER_LAB_ENCOUNTER}_${count}`);
    yield cancel(forkedProcess);
  }
  yield put({ type: SET_ORDER_LIST_FETCH_STATUS, status: true });
}

export function* setEncounters() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, fetchEncounters);
  yield takeEvery(UPDATE_LAB_ORDER_WITH_ENCOUNTER, fetchAndSetTestResultEncounter);
}
