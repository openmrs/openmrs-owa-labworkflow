import { axiosInstance } from '../config';
import { FETCH_LAB_CONCEPTS } from './actionTypes';


const fetchLabConcept = conceptUUID => ({
  type: FETCH_LAB_CONCEPTS,
  payload: axiosInstance.get(`/concept/${conceptUUID}?v=full`),
});

export default {
  fetchLabConcept,
};
