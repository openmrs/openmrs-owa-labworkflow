import R from 'ramda';
import moment from 'moment';
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
  selectors,
} from '@openmrs/react-components';
import {
  FETCH_LAB_ORDERS,
  UPDATE_LAB_ORDER_WITH_ENCOUNTER,
  SET_ORDER_LAB_ENCOUNTER,
  SET_ORDER_LIST_FETCH_STATUS,
  SET_LAB_ORDERS,
  CANCEL_ORDER,
} from '../actions/actionTypes';
import { setLabTestTypes, setOrderLabEncounter, fetchLabOrders } from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';
import { selectProperty } from '../utils/globalProperty';

const computeResultStatus = (encounter, state, order) => {
  const concealedConceptUUIDs = [
    selectProperty(state, 'labResultsTestOrderNumberConcept'),
    selectProperty(state, 'labResultsTestLocationQuestion'),
    selectProperty(state, 'labResultsDateConcept'),
    selectProperty(state, 'labResultsDidNotPerformReasonQuestion'),
    selectProperty(state, 'labResultsEstimatedCollectionDateQuestion'),
    selectProperty(state, 'labResultsDidNotPerformQuestion'),
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

  if (order.dateStopped !== null) {
    return "Cancelled";
  }

  if (order.autoExpireDate !== null) {
    return "Expired";
  }
  return "Ordered";
};


export function* clear() {
  yield put(setSelectedConcept());
}

export function* resetState() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, clear);
}

export function* filterAndSetOrders(action) {
  const { payload } = action;

  const result = payload.data.results;
  // filter out orders where action="DISCONTINUE"
  const orders = result.filter(order => order.action !== "DISCONTINUE");

  yield put({ type: SET_LAB_ORDERS, orders });

  const labTestTypes = R.compose(
    R.uniq,
    R.map(R.path(['concept', 'display'])),
  )(orders);

  yield put(setLabTestTypes(labTestTypes));
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
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, filterAndSetOrders);
}

export function* fetchAndSetTestResultEncounter(args) {
  const state = yield select();
  const { order, count = -1 } = args;
  const patientUUID = order.patient.uuid;
  const encounterTypeUUID = selectProperty(state, 'labResultsEncounterType');
  try {
    const encounterResponse = yield call(
      encounterRest.fetchEncountersByPatient,
      patientUUID,
      encounterTypeUUID,
    );

    const encounters = encounterResponse.results;
    const labResultsTestOrderNumberConcept = selectProperty(state, 'labResultsTestOrderNumberConcept');

    const matchedEncounter = encounters.filter((encounter) => {
      const testOrderObs = encounter.obs.filter(
        item => item.concept.uuid === labResultsTestOrderNumberConcept,
      );

      if (testOrderObs.length <= 0) return false;

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
          state,
          order,
        ),
      },
    };

    yield put(setOrderLabEncounter(count, orderWithEncounter));
  } catch (error) {
    yield put({ type: "FETCH_LAB_ORDERS_FAILURE", payload: error, error: true });
  }
}

export function* fetchEncounters(action) {
  const { orders } = action;
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
  yield takeEvery(SET_LAB_ORDERS, fetchEncounters);
  yield takeEvery(UPDATE_LAB_ORDER_WITH_ENCOUNTER, fetchAndSetTestResultEncounter);
}

function* updateOrders() {
  const state = yield select();
  const { labOrdersListFilters } = state.filters;
  const { labResultsTestOrderType } = state.openmrs.CONSTANTS;
  const options = {
    dateToField: moment(labOrdersListFilters.dateToField).format('YYYY-MM-DD'),
    dateFromField: moment(labOrdersListFilters.dateFromField).format('YYYY-MM-DD'),
  };
  yield put(fetchLabOrders(labResultsTestOrderType, options));
}

export function* cancelOrder() {
  yield takeEvery(`${CANCEL_ORDER}_SUCCESS`, updateOrders);
}
