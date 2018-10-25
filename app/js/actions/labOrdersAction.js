import { axiosInstance } from '../config';
import { FETCH_LAB_ORDERS, SET_LAB_TEST, FETCH_LAB_ORDER_TRENDS } from './actionTypes';

export const fetchLabOrders = patientUUID => ({
  type: FETCH_LAB_ORDERS,
  payload: axiosInstance.get(`order?totalCount=true&sort=desc&status=active&patient=${patientUUID}&v=full`),
});

export const fetchLabOrdersTrends = (patientUuid, conceptUuid) => ({
  type: FETCH_LAB_ORDER_TRENDS,
  payload: axiosInstance.get(`obs/?patient=${patientUuid}&concept=${conceptUuid}&v=custom:(id,uuid,display,obsDatetime,value:(id,uuid,display,name:(uuid,name)),encounter:(id,uuid,encounterDatetime,obs:(display,value)))`),
});

export const setLabTestTypes = testTypes => ({
  type: SET_LAB_TEST,
  testTypes,
});
