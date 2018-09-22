import { axiosInstance } from '../config';
import {
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  SET_FETCH_STATUS,
  SET_CONCEPT,
} from './actionTypes';


const fetchLabConcept = conceptUUID => ({
  type: FETCH_LAB_CONCEPT,
  payload: axiosInstance.get(`/concept/${conceptUUID}?v=full`),
});

const setMember = (member, count) => ({
  type: `${SET_CONCEPT_MEMBER}_${count}`,
  member,
});

const setSelectedConcept = () => ({
  type: SET_CONCEPT,
});

const setFetchStatus = status => ({
  type: SET_FETCH_STATUS,
  status,
});

export default {
  fetchLabConcept,
  setMember,
  setFetchStatus,
  setSelectedConcept,
};
