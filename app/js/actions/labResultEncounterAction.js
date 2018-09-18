import { axiosInstance } from '../config';
import { FETCH_LAB_RESULTS_ENCOUNTER_TYPE } from './actionTypes';


const fetchLabResultsEncounterType = () => ({
  type: FETCH_LAB_RESULTS_ENCOUNTER_TYPE,
  payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterType`),
});

export default {
  fetchLabResultsEncounterType,
};
