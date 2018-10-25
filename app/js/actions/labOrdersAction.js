import { axiosInstance } from '../config';
import { FETCH_LAB_ORDERS, SET_LAB_TEST } from './actionTypes';
import mockOrders from '../mockData/mockOrders.json';


export const fetchLabOrders = () => ({
  type: FETCH_LAB_ORDERS,
  payload: process.env.NODE_ENV !== 'production' ? Promise.resolve(mockOrders) : axiosInstance.get(`testorder?totalCount=true&sort=desc&status=active&patient=0c9bbb90-c85d-4a13-b2e6-8fc59f999ca4&v=full`),
});

export const setLabTestTypes = testTypes => ({
  type: SET_LAB_TEST,
  testTypes,
});
