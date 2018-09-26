import React from 'react';
import LabResultEntry from '../../../app/js/components/LabResultEntry';


let mountedComponent;

const orders = [
  {
    orderNumber: "ORD-1",
    concept: {
      display: "Hémogramme automatisé",
    },
    urgency: 'ROUTINE',
    dateActivated: "2018-08-30T17:34:19.000+0100",
    patient: {
      display: "Y2A7LR - williams willy john",
    },
  },
];

const props = {
  patientHeaderDetail: {
    display: "Y2A7LR - williams willy john",
  },
  selectedLAbConcept: {
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
    },
  },
  history: {
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
      },
    },
  },
  CONSTANTS: {
    labResultsDidNotPerformAnswer: 'mock-uuid',
    labResultsDidNotPerformQuestion: 'mock-uuid',
    labResultsDidNotPerformReason: 'mock-uuid',
  },
};

const state = {
  patient: {
    patient: {
      display: "Y2A7LR - williams willy john",
    },
  },
};

const store = mockStore(state);

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(<LabResultEntry {...props} store={store} />);
  }
  return mountedComponent;
};


describe('<LabResultEntry /> component', () => {
  it('renders correctly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
