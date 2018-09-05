import actionTypes from "./actionTypes";

const getPatient = patientUuid => ({
  type: actionTypes.SET_PATIENT.REQUESTED,
  payload: {
    patientUuid,
  },
});

const getPatientSucceeded = patientRecord => ({
  type: actionTypes.SET_PATIENT.SUCCEEDED,
  payload: patientRecord,
});

const getPatientFailed = message => ({
  type: actionTypes.SET_PATIENT.FAILED,
  error: {
    message,
  },
});

export default {
  getPatient,
  getPatientSucceeded,
  getPatientFailed,
};
