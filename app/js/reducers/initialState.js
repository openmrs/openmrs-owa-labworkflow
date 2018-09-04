export default {
  labOrderReducer: {
    orders: [],
    isLoading: false,
    error: {
      status: false,
      message: null,
    },
  },
  defaultPatient: {
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
