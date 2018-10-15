import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import LabResultEntry from '../../../app/js/components/LabResultEntry';


let mountedComponent;


let props = {
  patientHeaderDetail: {
    display: "Y2A7LR - williams willy john",
  },
  conceptMembers: {
    '1234-abcd': {
      hiNormal: 22,
      lowNormal: 11,
      lowAbsolute: 9,
      hiAbsolute: 25,
      hiCritical: 30,
      lowCritical: 3,
      units: 'cc',
    },
    'pqrs-5678': {
      hiNormal: 22,
      lowNormal: 11,
      lowAbsolute: 9,
      hiAbsolute: 25,
      hiCritical: 30,
      lowCritical: 3,
      units: 'cc',
    },
  },
  clearNameEMRField: jest.fn(),
  labTests: ['Hémogramme automatisé'],
  nameField: '',
  location: {
    state: {
      orderNumber: "ORD-1",
      concept: {
        display: "Hémogramme automatisé",
      },
      urgency: 'ROUTINE',
      dateActivated: "2018-08-30T17:34:19.000+0100",
      patient: {
        display: "Y2A7LR - williams willy john",
      },
      auditInfo: {
        dateCreated: "2018-08-30T17:34:19.000+0100",
      },
    },
  },
  history: {
    location: {
      state: {
        orderNumber: "ORD-1",
        concept: {
          uuid: '9i9i-99090-999',
          display: "Hémogramme automatisé",
        },
        urgency: 'ROUTINE',
        dateActivated: "2018-08-30T17:34:19.000+0100",
        patient: {
          display: "Y2A7LR - williams willy john",
        },
      },
    },
  },
};

const state = {
  patient: {
    patient: {
      display: "Y2A7LR - williams willy john",
    },
  },
  openmrs: {
    patients: {
      abcd: {
        uuid: 'abcd',
        display: "Y2A7LR - williams willy john",
      },
    },
    selectedPatient: 'abcd',
    CONSTANTS: {
      labResultsTestOrderNumberConcept: 'mock-test-orderno-concept',
      labResultsDateConcept: 'mock-date-concept',
      labResultsEncounterType: 'mock-encounter-uuid',
      labResultsDidNotPerformAnswer: 'mock-uuid',
      labResultsDidNotPerformQuestion: 'mock-uuid',
      labResultsDidNotPerformReason: 'mock-uuid',
    },
  },
  form: {},
  selectedLabConcept: {
    answers: [],
    set: true,
    setMembers: [
      {
        uuid: '1234-abcd',
        display: "Height",
      },
      {
        uuid: 'pqrs-5678',
        display: "Weight",
      },
    ],
  },
  conceptMembers: {
    '1234-abcd': {
      hiNormal: 22,
      lowNormal: 11,
      lowAbsolute: 9,
      hiAbsolute: 25,
      hiCritical: 30,
      lowCritical: 3,
      units: 'cc',
    },
    'pqrs-5678': {
      hiNormal: 22,
      lowNormal: 11,
      lowAbsolute: 9,
      hiAbsolute: 25,
      hiCritical: 30,
      lowCritical: 3,
      units: 'cc',
    },
  },
};

const store = mockStore(state);
const context = {
  store,
  storeSubscription: {
    onStateChange: jest.fn,
    parentSub: null,
    store,
    unsubscribe: jest.fn,
  },
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <HashRouter>
          <LabResultEntry {...props} />
        </HashRouter>
      </Provider>,
      { context },
    );
  }
  return mountedComponent;
};


describe('<LabResultEntry /> component', () => {
  it('renders correctly with valid props', (done) => {
    const component = getComponent();
    component.setProps({ location: { state: {} } });
    expect(component).toMatchSnapshot();
    done();
  });

  it('should render <Loader /> component when selectedLabConcept is empty', () => {
    props = {
      ...props,
      selectedLabConcept: {},
    };
    const store = mockStore({
      patient: {
        patient: {
          display: "Y2A7LR - williams willy john",
        },
      },
      selectedLabConcept: {},
      openmrs: {
        CONSTANTS: {
          labResultsTestOrderNumberConcept: 'mock-test-orderno-concept',
          labResultsDateConcept: 'mock-date-concept',
          labResultsEncounterType: 'mock-encounter-uuid',
          labResultsDidNotPerformAnswer: 'mock-uuid',
          labResultsDidNotPerformQuestion: 'mock-uuid',
          labResultsDidNotPerformReason: 'mock-uuid',
        },
      },
    });
    const component = mount(<LabResultEntry {...props} store={store} />);
    expect(component).toMatchSnapshot();
  });

  it('should redirect when location has an empty state', () => {
    props = {
      ...props,
      location: {
        state: null,
      },
    };
    const store = mockStore({
      patient: {
        patient: {
          display: "Y2A7LR - williams willy john",
        },
      },
      openmrs: {
        CONSTANTS: {
          labResultsTestOrderNumberConcept: 'mock-test-orderno-concept',
          labResultsDateConcept: 'mock-date-concept',
          labResultsEncounterType: 'mock-encounter-uuid',
          labResultsDidNotPerformAnswer: 'mock-uuid',
          labResultsDidNotPerformQuestion: 'mock-uuid',
          labResultsDidNotPerformReason: 'mock-uuid',
        },
      },
    });
    const component = mount(
      <HashRouter>
        <LabResultEntry {...props} store={store} />
      </HashRouter>,
    );
    expect(component).toMatchSnapshot();
  });
});
