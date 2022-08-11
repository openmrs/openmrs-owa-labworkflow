import { axiosInstance } from '../config';
import {
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  SET_FETCH_STATUS,
  SET_CONCEPT,
  FETCH_CONCEPT,
  FETCH_LAB_CATEGORIES_SET,
  SET_LAB_CATEGORIES_SET,
} from './actionTypes';
import { CONCEPT_REP } from './constantsAction';

export const fetchLabConcept = (conceptUUID) => ({
  type: FETCH_LAB_CONCEPT,
  payload: axiosInstance.get(`/concept/${conceptUUID}?v=${CONCEPT_REP}`),
});

export const setMember = (member, count) => ({
  type: `${SET_CONCEPT_MEMBER}_${count}`,
  member,
});

export const setSelectedConcept = () => ({
  type: SET_CONCEPT,
});

export const setFetchStatus = (status) => ({
  type: SET_FETCH_STATUS,
  status,
});

export const fetchConcept = (conceptUUID) => ({
  type: FETCH_CONCEPT,
  conceptUUID,
});

export const fetchLabCategoriesSet = (conceptUuid) => ({
  type: FETCH_LAB_CATEGORIES_SET,
  conceptUuid,
});

export const setLabCategoriestSet = (set, flattenedSet) => ({
  type: SET_LAB_CATEGORIES_SET,
  set,
  flattenedSet,
});
