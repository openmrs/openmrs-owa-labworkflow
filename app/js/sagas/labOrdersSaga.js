import R from 'ramda';
import moment from 'moment';
import toastr from 'toastr';
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
  orderRest,
} from '@openmrs/react-components';
import {
  FETCH_LAB_ORDERS,
  UPDATE_LAB_ORDER_WITH_ENCOUNTER,
  SET_ORDER_LAB_ENCOUNTER,
  SET_ORDER_LIST_FETCH_STATUS,
  SET_LAB_ORDERS,
  CANCEL_ORDER, SAVE_FULFILLER_STATUS,
} from '../actions/actionTypes';
import {
  setLabTestTypes, setOrderLabEncounter, fetchLabOrders, saveFulfillerStatusSucceeded,
  saveFulfillerStatusFailed,
} from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';
import { selectProperty, selectLocale, getMessage } from '../utils/globalProperty';
import { getConceptShortName } from '../utils/helpers';

const getOrderNumber = (encounter, state) => {
  const orderNumberConceptUUID = selectProperty(state, 'labResultsTestOrderNumberConcept');
  if (encounter && encounter.obs) {
    // TODO should only ever be one order number on per encounter, but should add better check
    const orderNumberObs = encounter.obs.find(item => item.concept.uuid === orderNumberConceptUUID);
    if (orderNumberObs) {
      return orderNumberObs.value;
    }
  }
  return "";
};

const computeFulfillerStatus = (encounter, state) => {
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
        return "COMPLETED";
      }
    }
    return "IN_PROGRESS";
  }

  return "RECEIVED"; // likely should never get here
};

export function* clear() {
  yield put(setSelectedConcept());
}

export function* resetState() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, clear);
}

export function* filterAndSetOrders(action) {
  const { payload } = action;
  const state = yield select();
  const locale = selectLocale(state);

  const result = payload.data.results;
  // filter out orders where action="DISCONTINUE"
  const orders = result.filter(order => order.action !== "DISCONTINUE");

  yield put({ type: SET_LAB_ORDERS, orders });

  const conceptNames = orders.map(order => getConceptShortName(order.concept, locale));
  const labTestTypes = R.uniq(conceptNames);
  yield put(setLabTestTypes(labTestTypes));
}

export function* setTestTypes(action) {
  const { payload } = action;
  const state = yield select();
  const locale = selectLocale(state);

  const conceptNames = payload.data.results.map(
    order => getConceptShortName(order.concept, locale),
  );
  const labTestTypes = R.uniq(conceptNames);

  yield put(setLabTestTypes(labTestTypes));
}

export function* setLabTestsSaga() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, filterAndSetOrders);
}

export function* fetchAndSetTestResultEncounter(args) {
  const state = yield select();
  const { order, count = -1 } = args;
  const patientUUID = order.patient.uuid;
  const encounterTypeUUID = selectProperty(state, 'labResultsEntryEncounterType');
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
        encounter: matchedEncounter[0] || null
      },
    };

    yield put(setOrderLabEncounter(count, orderWithEncounter));
  } catch (error) {
    yield put({ type: "FETCH_LAB_ORDERS_FAILURE", payload: error, error: true });
  }
}

function* updateOrders() {
  const state = yield select();
  const { labOrdersListFilters } = state.filters;
  const labResultsTestOrderType = selectProperty(state, 'labResultsTestOrderType');
  const options = {
    dateToField: moment(labOrdersListFilters.dateToField).format('YYYY-MM-DD'),
    dateFromField: moment(labOrdersListFilters.dateFromField).format('YYYY-MM-DD'),
  };
  yield put(fetchLabOrders(labResultsTestOrderType, options));
}

function* cancelAndUpdateOrders() {
  const state = yield select();
  const cancelMsg = getMessage(state, "app.lab.order.cancel.success", "Order Canceled");
  yield updateOrders();
  yield toastr.success(cancelMsg, { timeout: 2000 });
}

export function* cancelOrder() {
  yield takeEvery(`${CANCEL_ORDER}_SUCCESS`, cancelAndUpdateOrders);
}

// the saveFulfillerStatus action is dispatched after the lab results entry page is saved
// it updates the fulfiller status on the related order
function* saveFulfillerStatusHelper(action) {
  const state = yield select();
  const orderNumber = getOrderNumber(action.encounter, state);

  if (orderNumber && state.labOrders && state.labOrders.orders) {
    const labOrder = state.labOrders.orders.find(order => order.orderNumber === orderNumber);

    if (labOrder) {
      const fulfillerStatus = computeFulfillerStatus(action.encounter, state);

      if (fulfillerStatus !== labOrder.fulfillerStatus) {
        try {
          yield call(
            orderRest.updateFulfillerDetails,
            {
              uuid: labOrder.uuid,
            },
            {
              fulfillerStatus,
            },
          );
          yield put(saveFulfillerStatusSucceeded());
        } catch (error) {
          yield put(saveFulfillerStatusFailed());
        }
      }
    } else {
      // TODO handle fetching lab order RESTfully if not found in state
      yield put(saveFulfillerStatusFailed());
    }
  } else {
    yield put(saveFulfillerStatusFailed());
  }
}

export function* saveFulfillerStatus() {
  yield takeEvery(SAVE_FULFILLER_STATUS, saveFulfillerStatusHelper);
}
