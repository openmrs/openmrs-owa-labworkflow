import { axiosInstance } from '../config';
import {
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  SET_FETCH_STATUS,
  SET_CONCEPT,
  FETCH_CONCEPT,
} from './actionTypes';
import { conceptRest } from '@openmrs/react-components';

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

export const fetchConcept = conceptUUID => ({
  type: FETCH_CONCEPT,
  conceptUUID,
})
