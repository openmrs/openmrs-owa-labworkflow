import { axiosInstance } from '../config';
import { FETCH_LAB_RESULTS_ENCOUNTER_TYPE, GET_DATE } from './actionTypes';


const fetchLabResultsEncounterType = () => ({
  type: FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterType`),
});

const getDateFormat = () => ({
  type: GET_DATE,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.dateAndTimeFormat`),
});

export default {
  fetchLabResultsEncounterType,
  getDateFormat,
};
