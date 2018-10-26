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
  labOrderTrendsReducer: {
    result: [],
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
  },
  selectedPatient: {},
  selectedLabConcept: {},
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
};
