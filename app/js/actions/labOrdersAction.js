import { axiosInstance } from '../config';
import { FETCH_LAB_ORDERS, SET_LAB_TEST } from './actionTypes';
import mockOrders from '../mockData/mockOrders.json';


export const fetchLabOrders = patientUUID => ({
  type: FETCH_LAB_ORDERS,
  payload: axiosInstance.get(`order?totalCount=true&sort=desc&status=active&patient=${patientUUID}&v=full`),
});

export const setLabTestTypes = testTypes => ({
  type: SET_LAB_TEST,
  testTypes,
});
