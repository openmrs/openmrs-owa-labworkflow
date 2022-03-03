import actionTypes, {
  SET_SELECTED_PATIENT, ADD_PATIENT,
  FETCH_PATIENT_LAB_TEST_RESULTS,
  SET_PATIENT_DATA,
} from "./actionTypes";

const getPatient = (patientUuid) => ({
  type: actionTypes.SET_PATIENT.REQUESTED,
  payload: {
    patientUuid,
  },
});

const getPatientSucceeded = (patientRecord) => ({
  type: actionTypes.SET_PATIENT.SUCCEEDED,
  payload: patientRecord,
});

const getPatientFailed = (message) => ({
  type: actionTypes.SET_PATIENT.FAILED,
  error: {
    message,
  },
});

const setSelectedPatient = (patientUUID) => ({
  type: SET_SELECTED_PATIENT,
  patientUUID,
});

const addPatient = (patient) => ({
  type: ADD_PATIENT,
  patient,
});

const fetchPatientLabTestResults = (patientUUID) => ({
  type: FETCH_PATIENT_LAB_TEST_RESULTS,
  patientUUID,
});

const setPatientData = (patientInfo) => ({
  type: SET_PATIENT_DATA,
  ...patientInfo,
});

export default {
  getPatient,
  getPatientSucceeded,
  getPatientFailed,
  setSelectedPatient,
  addPatient,
  fetchPatientLabTestResults,
  setPatientData,
};
