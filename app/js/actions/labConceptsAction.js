import { axiosInstance } from '../config';
import { FETCH_LAB_CONCEPTS, SET_CONCEPT_MEMBER } from './actionTypes';


const fetchLabConcept = conceptUUID => ({
  type: FETCH_LAB_CONCEPTS,
  payload: axiosInstance.get(`/concept/${conceptUUID}?v=full`),
});

const setMembers = member => ({
  type: SET_CONCEPT_MEMBER,
  member,
});

export default {
  fetchLabConcept,
  setMembers,
};
