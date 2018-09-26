export default {
  labOrderReducer: {
    orders: [],
    labTests: [],
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
  },
  selectedPatient: null,
  selectedLabConcept: null,
  conceptMembers: {},
  patients: {},
  fetchStatus: {
    isLoading: false,
  },
  patientReducer: {
    patient: {
      person: {
        personName: {
          givenName: '',
          familyName: '',
        },
        preferredAddress: {},
      },
      patientIdentifier: {
        identifier: '',
      },
    },
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
  },
  CONSTANTS: {
    labResultsEncounterType: '',
    labResultsDateConcept: '',
    labResultsDidNotPerformAnswer: '',
    labResultsDidNotPerformQuestion: '',
    labResultsDidNotPerformReason: null,
    dateAndTimeFormat: '',
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
  },
};
