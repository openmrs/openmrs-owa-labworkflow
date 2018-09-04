
import actionTypes from "./actionTypes";

const getPatientRecord = patientUuid => ({
  type: actionTypes.SET_PATIENT.REQUESTED,
  payload: {
    patientUuid,
  },
});

const getPatientRecordSucceeded = patientRecord => ({
  type: actionTypes.SET_PATIENT.SUCCEEDED,
  payload: patientRecord,
});

const getPatientRecordFailed = message => ({
  type: actionTypes.SET_PATIENT.FAILED,
  error: {
    message,
  },
});

const getPatientNote = patientUuid => ({
  type: actionTypes.SET_PATIENT_NOTE.REQUESTED,
  payload: {
    patientUuid,
  },
});

const getPatientNoteSucceeded = patientNote => ({
  type: actionTypes.SET_PATIENT_NOTE.SUCCEEDED,
  payload: patientNote,
});

const getPatientNoteFailed = message => ({
  type: actionTypes.SET_PATIENT_NOTE.FAILED,
  error: {
    message,
  },
});

export default {
  getPatientRecord,
  getPatientRecordSucceeded,
  getPatientRecordFailed,
  getPatientNote,
  getPatientNoteSucceeded,
  getPatientNoteFailed,
};
