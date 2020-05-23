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
  SET_LAB_RESULTS_ENCOUNTER,
  SET_ORDER_LIST_FETCH_STATUS,
  SET_LAB_ORDERS,
  CANCEL_ORDER, SAVE_FULFILLER_STATUS, PRINT_LAB_LABEL,
  FETCH_LAB_ORDERABLES_SETTING,
  FETCH_LAB_ORDERABLES,
} from '../actions/actionTypes';
import {
  setLabTestTypes, setLabResultsEncounter, fetchLabOrders, saveFulfillerStatusSucceeded,
  saveFulfillerStatusFailed,
} from '../actions/labOrdersAction';
import { getLabOrderablesConceptSet, getLabOrderablesSuccess } from '../actions/labOrderablesAction';
import { setSelectedConcept } from '../actions/labConceptsAction';
import { selectProperty, selectLocale, getMessage } from '../utils/globalProperty';
import { getConceptShortName } from '../utils/helpers';
import { FULFILLER_STATUS, DEFAULT_ORDERS_BATCH_SIZE } from '../constants';

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
  const didNotPerformQuestion = selectProperty(state, 'labResultsDidNotPerformQuestion');
  const concealedConceptUUIDs = [
    selectProperty(state, 'labResultsTestOrderNumberConcept'),
    selectProperty(state, 'labResultsTestLocationQuestion'),
    selectProperty(state, 'labResultsDateConcept'),
    selectProperty(state, 'labResultsDidNotPerformReasonQuestion'),
    selectProperty(state, 'labResultsEstimatedCollectionDateQuestion'),
    didNotPerformQuestion,
  ];

  if (encounter) {
    const hasObs = !R.isNil(encounter.obs);
    if (hasObs) {
      const notPerformedObs = R.pipe(
        R.filter(item => item.concept.uuid === didNotPerformQuestion),
      )(encounter.obs);

      if (!R.isEmpty(notPerformedObs)) {
        return FULFILLER_STATUS.EXCEPTION;
      }

      const obs = R.pipe(
        R.filter(item => !concealedConceptUUIDs.includes(item.concept.uuid)),
      )(encounter.obs);

      if (!R.isEmpty(obs)) {
        return FULFILLER_STATUS.COMPLETED;
      }
    }
    return FULFILLER_STATUS.IN_PROGRESS;
  }

  return FULFILLER_STATUS.RECEIVED; // likely should never get here
};

export function* clear() {
  yield put(setSelectedConcept());
}

export function* resetState() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, clear);
}

export function* filterAndSetOrders(action) {
  const { payload } = action;
  const orders = payload.data.results;
  const { totalCount } = payload.data;

  yield put({
    type: SET_LAB_ORDERS,
    orders,
    totalCount,
  });
}

export function* getLabOrderablesSet(action) {
  const { payload } = action;
  const result = payload.data.results;
  yield put(getLabOrderablesConceptSet(result[0].value));
}

export function* updateLabOrderablesConcepts(action) {
  const { payload } = action;
  const labCategories = payload.data;
  const testTypes = [];

  const state = yield select();
  const locale = selectLocale(state);

  if (labCategories && labCategories.setMembers && labCategories.setMembers.length > 0) {
    labCategories.setMembers.forEach((labSet) => {
      if (labSet.setMembers && labSet.setMembers.length > 0) {
        labSet.setMembers.forEach((orderable) => {
          const testType = {
            uuid: orderable.uuid,
            display: getConceptShortName(orderable, locale),
          };
          testTypes.push(testType);
        });
      }
    });
    const labTestTypes = R.uniq(testTypes);
    const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('display')));
    yield put(setLabTestTypes(sortByNameCaseInsensitive(labTestTypes)));
  }
  yield put(getLabOrderablesSuccess(labCategories.display));
}

export function* setLabTestsSaga() {
  yield takeEvery(`${FETCH_LAB_ORDERS}_SUCCESS`, filterAndSetOrders);
}

export function* setLabOrderablesSetting() {
  yield takeEvery(`${FETCH_LAB_ORDERABLES_SETTING}_SUCCESS`, getLabOrderablesSet);
}

export function* updateTestTypeFilter() {
  yield takeEvery(`${FETCH_LAB_ORDERABLES}_SUCCESS`, updateLabOrderablesConcepts);
}

export function* fetchAndSetTestResultEncounter(args) {
  const state = yield select();
  const { order } = args;
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

    yield put(setLabResultsEncounter(order, matchedEncounter[0] || null));
  } catch (error) {
    yield put({ type: "FETCH_LAB_ORDERS_FAILURE", payload: error, error: true });
  }
}

export function* setEncounters() {
  yield takeEvery(UPDATE_LAB_ORDER_WITH_ENCOUNTER, fetchAndSetTestResultEncounter);
}

function* updateOrders() {
  const state = yield select();
  const { labOrdersListFilters } = state.filters;
  const labResultsTestOrderType = selectProperty(state, 'labResultsTestOrderType');
  const ordersBatchSize = selectProperty(state, 'ordersBatchSize');
  const options = {
    dateToField: moment(labOrdersListFilters.dateToField).format('YYYY-MM-DD'),
    dateFromField: moment(labOrdersListFilters.dateFromField).format('YYYY-MM-DD'),
    excludeCanceledAndExpired: true,
    ordersBatchSize: (ordersBatchSize || DEFAULT_ORDERS_BATCH_SIZE),
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

function* printLabLabelSuccess(action) {
  const state = yield select();
  const successMsg = getMessage(state, "app.lab.print.success", "Label Printed");
  const errorMsg = getMessage(state, "app.lab.print.failure", "Fail to print label");
  const data = R.path(['payload', 'data'], action);
  if (!R.isNil(data) && (data.error === true)) {
    yield toastr.error(!R.isNil(data.message) ? data.message : errorMsg, { timeout: 2000 });
  } else {
    yield toastr.success(successMsg, { timeout: 2000 });
  }
}

function* printLabLabelFailure(action) {
  const state = yield select();
  const printMsg = getMessage(state, "app.lab.print.failure", "Fail to print label");
  yield toastr.error(printMsg, { timeout: 2000 });
}

export function* printLabel() {
  yield takeEvery(`${PRINT_LAB_LABEL}_SUCCESS`, printLabLabelSuccess);
  yield takeEvery(`${PRINT_LAB_LABEL}_FAILURE`, printLabLabelFailure);
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
