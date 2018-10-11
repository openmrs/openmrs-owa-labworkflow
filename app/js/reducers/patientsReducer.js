import {
  SET_SELECTED_PATIENT,
  ADD_PATIENT,
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  SET_FETCH_STATUS,
  SET_CONCEPT,
  UPDATE_PATIENT_INFO,
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
    case UPDATE_PATIENT_INFO: {
      const { patientUUID } = action;
      const pat = state[patientUUID];
      const patientInfo = {
        ...state[patientUUID],
        ...action.meta,
      };
      return {
        ...state,
        [patientUUID]: patientInfo,
      };
    }
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
    case `${FETCH_LAB_CONCEPT}_SUCCESS`: {
      const selectedLabConcept = action.payload.data;
      return selectedLabConcept;
    }
    case SET_CONCEPT: {
      const selectedLabConcept = {};
      return selectedLabConcept;
    }
    default: return state;
  }
};

export const conceptMembersReducer = (state = initialState.conceptMembers, action) => {
  if (action.type.includes(SET_CONCEPT_MEMBER)) {
    return {
      [action.member.uuid]: action.member,
      ...state,
    };
  }
  return state;
};

export const fetchStatusReducer = (state = initialState.fetchStatus, action) => {
  switch (action.type) {
    case SET_FETCH_STATUS: {
      return {
        isLoading: action.status,
      };
    }
    default: return state;
  }
};
