import { axiosInstance } from '../config';
import {
  FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  FETCH_LAB_RESULTS_DATE_CONCEPT,
  GET_DATE,
} from './actionTypes';


const fetchLabResultsEncounterType = () => ({
  type: FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterType`),
});

const fetchLabResultsDateConcept = () => ({
  type: FETCH_LAB_RESULTS_DATE_CONCEPT,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsDateConcept`),
});

const getDateFormat = () => ({
  type: GET_DATE,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.dateAndTimeFormat`),
});

export default {
  fetchLabResultsEncounterType,
  fetchLabResultsDateConcept,
  getDateFormat,
};
