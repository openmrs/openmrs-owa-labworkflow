export default {
  labOrderReducer: {
    orders: [],
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
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
  patientNoteReducer: {
    patientNote: {},
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
  },
};
