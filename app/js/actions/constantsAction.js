import { axiosInstance } from '../config';
import {
  FETCH_CONCEPT_CONSTANT,
} from './actionTypes';

const fetchConceptAsConstant = (conceptUuid, constantName) => ({
  type: FETCH_CONCEPT_CONSTANT,
  payload: axiosInstance.get(`concept/${conceptUuid}`),
  meta: {
    constantName,
  },
});

export default {
  fetchConceptAsConstant,
};