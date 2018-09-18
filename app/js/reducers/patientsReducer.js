import {
  SET_SELECTED_PATIENT,
  ADD_PATIENT,
  FETCH_LAB_CONCEPTS,
  SET_CONCEPT_MEMBER,
} from '../actions/actionTypes';
import initialState from './initialState';

export const patientsReducer = (state = initialState.patients, action) => {
  switch (action.type) {
    case ADD_PATIENT:
      if (action.patient.uuid in state) {
        return state;
      }
      return {
        [action.patient.uuid]: action.patient,
        ...state,
      };
    default: return state;
  }
};

export const selectedPatientReducer = (state = initialState.selectedPatient, action) => {
  if (action.type === SET_SELECTED_PATIENT) {
    const selectedPatient = action.patientUUID;
    return selectedPatient;
  }
  return state;
};

export const selectedLabConceptReducer = (state = initialState.selectedLabConcept, action) => {
  switch (action.type) {
    case `${FETCH_LAB_CONCEPTS}_SUCCESS`: {
      const selectedLabConcept = action.payload.data;
      return selectedLabConcept;
    }
    default: return state;
  }
};

export const conceptMembersReducer = (state = initialState.conceptMembers, action) => {
  switch (action.type) {
    case SET_CONCEPT_MEMBER: {
      return {
        [action.member.uuid]: action.member,
        ...state,
      };
    }
    default: return state;
  }
};
