import { axiosInstance } from '../config';
import { FETCH_LAB_ORDERS } from './actionTypes';
import mockOrders from '../mockData/mockOrders.json';


export const fetchLabOrders = () => ({
    type: FETCH_LAB_ORDERS,
    payload : Promise.resolve(mockOrders),
});

