import { axiosInstance } from '../config';
import {
  FETCH_LAB_ORDERS,
  UPDATE_LAB_ORDER_WITH_ENCOUNTER,
  SET_LAB_TEST,
  FETCH_LAB_TEST_RESULTS,
  SET_ORDER_LAB_ENCOUNTER,
  CANCEL_ORDER,
  SAVE_FULFILLER_STATUS,
  SAVE_FULFILLER_STATUS_SUCCEEDED,
  SAVE_FULFILLER_STATUS_FAILED,
  PRINT_LAB_LABEL,
} from './actionTypes';

const ORDER_REP = "custom:(id,uuid,display,orderNumber,dateActivated,scheduledDate,dateStopped,autoExpireDate,fulfillerStatus,orderType:(id,uuid,display,name),encounter:(id,uuid,display,encounterDatetime),careSetting:(uuid,name,careSettingType,display),accessionNumber,urgency,action,patient:(uuid,display),concept:(id,uuid,allowDecimal,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType))";

export const fetchLabOrders = (testOrderType, options) => ({
  type: FETCH_LAB_ORDERS,
  payload: axiosInstance.get(`order?s=default&totalCount=true&sort=desc&orderTypes=${testOrderType}&activatedOnOrAfterDate=${options.dateFromField}&activatedOnOrBeforeDate=${options.dateToField}&excludeCanceledAndExpired=${options.excludeCanceledAndExpired}&canceledOrExpiredOnOrBeforeDate=${options.canceledOrExpiredOnOrBeforeDate ? options.canceledOrExpiredOnOrBeforeDate : ''}&fulfillerStatus=${options.fulfillerStatus ? options.fulfillerStatus : ''}&concepts=${options.conceptUuids ? options.conceptUuids : ''}&v=${ORDER_REP}&limit=${options.ordersBatchSize}`),
});

export const updateLabOrderWithEncounter = labOrder => ({
  type: UPDATE_LAB_ORDER_WITH_ENCOUNTER,
  order: labOrder,
});

export const fetchLabTestResults = (patientUuid, conceptUuid) => ({
  type: FETCH_LAB_TEST_RESULTS,
  payload: axiosInstance.get(`obs/?patient=${patientUuid}&concept=${conceptUuid}&v=custom:(id,uuid,display,obsDatetime,value:(id,uuid,display,name:(uuid,name)),encounter:(id,uuid,encounterDatetime,obs:(uuid,display,value)))`),
});

export const setLabTestTypes = testTypes => ({
  type: SET_LAB_TEST,
  testTypes,
});

export const setOrderLabEncounter = (count, order) => ({
  type: `${SET_ORDER_LAB_ENCOUNTER}_${count}`,
  order,
});

export const cancelOrder = order => ({
  type: CANCEL_ORDER,
  payload: axiosInstance.post(`order`, order),
});

export const printLabel = patient => ({
  type: PRINT_LAB_LABEL,
  payload: axiosInstance.get(`${patient.url}?patient=${patient.patient}&sessionLocation=${patient.sessionLocation}`),
});

export const saveFulfillerStatus = payload => ({
  type: SAVE_FULFILLER_STATUS,
  encounter: payload.encounter,
});

export const saveFulfillerStatusSucceeded = () => ({
  type: SAVE_FULFILLER_STATUS_SUCCEEDED,
});

export const saveFulfillerStatusFailed = () => ({
  type: SAVE_FULFILLER_STATUS_FAILED,
});
