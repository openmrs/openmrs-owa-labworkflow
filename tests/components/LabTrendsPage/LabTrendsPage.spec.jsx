import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import LabTrendsPage from '../../../app/js/components/LabTrendsPage';

let props;
let mountedComponent;
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
  labOrdersTrend: {
    result: [
      {
        id: 540405,
        uuid: "8c4250cc-87ac-4023-94de-da57e69d7021",
        display: "SÉRUM POTASSIUM: 5,0",
        obsDatetime: "2018-10-24T10:22:48.000-0400",
        value: 5,
        encounter: {
          id: 158849,
          uuid: "81c0b8ab-b813-42d1-83af-a121e4db495c",
          encounterDatetime: "2018-10-24T10:22:48.000-0400",
          obs: [
            {
              display: "Sérum sodium: 150,0",
              value: 150,
            },
            {
              display: "Serum pH measurement: 13,0",
              value: 13,
            },
            {
              display: "Sérum chloride: 100,0",
              value: 100,
            },
          ],
        },
      },
    ],
  },
});

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <HashRouter>
          <LabTrendsPage {...props} />
        </HashRouter>
      </Provider>,
    );
  }
  return mountedComponent;
};

// TODO: Fix failing test
describe.skip('Component: LabTrendsPage', () => {
  beforeEach(() => {
    props = {
      patientHeaderDetail: true,
      history: {
        location: {
          state: {
            uuid: 'mockUuid',
            display: 'mockDisplayName',
          },
        },
      },
      store,
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
