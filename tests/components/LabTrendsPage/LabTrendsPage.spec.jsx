import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mountWithIntl } from "@openmrs/react-components";
import LabTrendsPage from '../../../app/js/components/LabTrendsPage';

let props;
let mountedComponent;
const store = mockStore({
  patients: {
    'some-patient-uuid': {
      display: "Y2A7LR - williams willy john",
      uuid: 'some-patient-uuid',
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
  selectedPatient: 'some-patient-uuid',
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
  conceptMembers: {
    '3cd69a98-26fe-102b-80cb-0017a47871b2': {},
  },
  labTestResults: {
    results: [
      {
        display: "Hematocrit: 56.0",
        encounter: {
          id: 140,
          uuid: "271fac91-06db-4454-b330-704446722867",
          encounterDatetime: "2018-11-09T00:00:00.000+0100",
          obs: [
            {
              display: "Test order number: ORD-57",
              uuid: "6d005f07-8b2e-4f03-9a91-1c2b1763e93e",
              value: "ORD-57",
            },
            {
              display: "Hematocrit: 56.0",
              uuid: "48631bb1-2483-44c2-bda7-76548b0dd3b0",
              value: 56,
            },
            {
              display: "Date of test results: 2018-11-09",
              uuid: "e083aab4-749b-4712-8e88-43c6a7d666f7",
              value: "2018-11-09T00:00:00.000+0100",
            },
          ],
        },
        id: 523,
        obsDatetime: "2018-11-09T00:00:00.000+0100",
        uuid: "48631bb1-2483-44c2-bda7-76548b0dd3b0",
        value: 56,
      },
    ],
  },
});

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mountWithIntl(
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
describe('Component: LabTrendsPage', () => {
  beforeEach(() => {
    props = {
      patientHeaderDetail: true,
      history: {
        location: {
          state: {
            answers: [],
            attributes: [],
            conceptClass: {
              uuid: "8d4907b2-c2cc-11de-8d13-0010c6dffd0f",
              display: "Test",
            },
            datatype: {
              uuid: "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
              display: "Numeric",
            },
            display: "Hematocrit",
            name: {
              display: "Hematocrit",
              uuid: "3e148d20-26fe-102b-80cb-0017a47871b2",
              name: "Hematocrit",
              locale: "en",
              localePreferred: true,
            },
            resourceVersion: "2.0",
            retired: false,
            set: false,
            setMembers: [],
            uuid: "3cd69a98-26fe-102b-80cb-0017a47871b2",
            version: null,
          },
        },
      },
      store,
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
