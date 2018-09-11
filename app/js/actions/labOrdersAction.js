import { axiosInstance } from '../config';
import { FETCH_LAB_ORDERS, SET_LAB_TEST } from './actionTypes';
import mockOrders from '../mockData/mockOrders.json';


export const fetchLabOrders = () => ({
  type: FETCH_LAB_ORDERS,
  payload: Promise.resolve(mockOrders),
});

export const setLabTestTypes = testTypes => ({
  type: SET_LAB_TEST,
  testTypes,
});
