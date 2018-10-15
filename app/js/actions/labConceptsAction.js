import { axiosInstance } from '../config';
import {
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  SET_FETCH_STATUS,
  SET_CONCEPT,
} from './actionTypes';

export const fetchLabConcept = conceptUUID => ({
  type: FETCH_LAB_CONCEPT,
  payload: axiosInstance.get(`/concept/${conceptUUID}?v=full`),
});

export const setMember = (member, count) => ({
  type: `${SET_CONCEPT_MEMBER}_${count}`,
  member,
});

export const setSelectedConcept = () => ({
  type: SET_CONCEPT,
});

export const setFetchStatus = status => ({
  type: SET_FETCH_STATUS,
  status,
});
