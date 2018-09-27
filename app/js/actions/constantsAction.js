import { axiosInstance } from '../config';
import {
  FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  FETCH_LAB_RESULTS_DATE_CONCEPT,
  FETCH_LAB_RESULTS_DID_NOT_PERFORM_QUESTION,
  FETCH_LAB_RESULTS_DID_NOT_PERFORM_REASON,
  FETCH_LAB_RESULTS_DID_NOT_PERFORM_ANSWER,
  FETCH_LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT,
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

const fetchLabResultsDidNotPerformQuestion = () => ({
  type: FETCH_LAB_RESULTS_DID_NOT_PERFORM_QUESTION,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformQuestion`),
});

const fetchLabResultsDidNotPerformReason = () => ({
  type: FETCH_LAB_RESULTS_DID_NOT_PERFORM_REASON,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformReason`),
});

const fetchLabResultsDidNotPerformAnswer = () => ({
  type: FETCH_LAB_RESULTS_DID_NOT_PERFORM_ANSWER,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformAnswer`),
});

const fetchLabResultsTestOrderNumberConcept = () => ({
  type: FETCH_LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.testOrderNumberConcept`),
});

const getDateFormat = () => ({
  type: GET_DATE,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.dateAndTimeFormat`),
});

export default {
  fetchLabResultsEncounterType,
  fetchLabResultsDateConcept,
  getDateFormat,
  fetchLabResultsDidNotPerformQuestion,
  fetchLabResultsDidNotPerformAnswer,
  fetchLabResultsDidNotPerformReason,
  fetchLabResultsTestOrderNumberConcept,
};
