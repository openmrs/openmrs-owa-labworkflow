import { axiosInstance } from '../config';
import {
  FETCH_CONCEPT_CONSTANT,
} from './actionTypes';

export const CONCEPT_REP = "custom:(id,uuid,display,answers,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType),set,setMembers:(id,uuid,display,answers,set,setMembers:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType)),names:(id,uuid,name,locale,localePreferred,voided,conceptNameType))";

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
