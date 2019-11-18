import {
  GET_LAB_ORDERABLES_SUCCESS,
  GET_LAB_ORDERABLES_FAILURE,
  FETCH_LAB_ORDERABLES_SETTING,
  FETCH_LAB_ORDERABLES,
  NETWORK_ERROR,
} from './actionTypes';
import { axiosInstance } from '../config';

const LAB_ORDERABLES_CONCEPT_REP = "custom:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType),set,setMembers:(id,uuid,display,set,setMembers:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType)),names:(id,uuid,name,locale,localePreferred,voided,conceptNameType))";

export const getLabOrderablesSuccess = value => ({
  type: GET_LAB_ORDERABLES_SUCCESS,
  value,
});

export const getLabOrderablesFailure = error => ({
  type: GET_LAB_ORDERABLES_FAILURE,
  error,
});

const NotFoundException = message => ({
  response: message,
});

export const networkError = error => ({
  type: NETWORK_ERROR,
  error,
});

export const getLabOrderablesConceptSet = value => ({
  type: FETCH_LAB_ORDERABLES,
  payload: axiosInstance.get(`/concept/${value}?v=${LAB_ORDERABLES_CONCEPT_REP}`),
});

export const getLabOrderables = () => ({
  type: FETCH_LAB_ORDERABLES_SETTING,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.labOrderablesConceptSet`),
});
