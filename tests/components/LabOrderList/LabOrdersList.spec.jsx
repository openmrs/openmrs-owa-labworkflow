import React from 'react';
import moment from 'moment';
import { mountWithIntl } from '@openmrs/react-components';
import {
  LabOrdersList,
  Cell,
} from '../../../app/js/components/LabOrdersList';


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
  dispatch: jest.fn(),
  orders,
  isLoading: false,
  labTests: ['Hémogramme automatisé'],
  openmrs: {
    CONSTANTS: {
      dateAndTimeFormat: 'DD-MMM-YYYY',
    },
  },
  labOrdersListFilters: {
    dateFromField: moment('2018-11-11'),
    dateToField: moment('2018-11-11'),
    testTypeField: '',
    dateField: '',
  },
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mountWithIntl(<LabOrdersList {...props} />);
  }
  return mountedComponent;
};


describe('<LabOrdersList /> component', () => {
  it('renders correctly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});

describe('LabOrdersListContainer container', () => {
  it('should pass required props from state to <LabOrdersList /> component', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('<Cell /> component', () => {
    it('returns EMR ID section', () => {
      const values = {
        columnName: 'EMR ID',
        value: {
          patient: {
            display: "Y2A7LR - williams willy john",
          },
        },
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns NAME column', () => {
      const values = {
        columnName: 'NAME',
        value: {
          patient: {
            display: "Y2A7LR - williams willy john",
          },
        },
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns ORDER ID column', () => {
      const values = {
        columnName: 'ORDER ID',
        value: {
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
        dateAndTimeFormat: "DD-MMM-YYYY HH:mm",
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns ORDER DATE column', () => {
      const values = {
        columnName: 'ORDER DATE',
        value: {
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
        dateAndTimeFormat: "DD-MMM-YYYY HH:mm",
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns COLLECTION DATE column', () => {
      const values = {
        columnName: 'COLLECTION DATE',
        value: {
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
        dateAndTimeFormat: "DD-MMM-YYYY HH:mm",
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns URGENCY column', () => {
      const cn = jest.mock('classnames');
      const values = {
        columnName: 'COLLECTION DATE',
        value: {
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
        dateAndTimeFormat: "DD-MMM-YYYY HH:mm",
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns TEST TYPE column', () => {
      const values = {
        columnName: 'TEST TYPE',
        value: {
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
        dateAndTimeFormat: "DD-MMM-YYYY HH:mm",
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
    it('returns null when no column name is matched', () => {
      const values = {
        columnName: 'SOME RIDICULOUS COLUMN',
        value: {
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
        dateAndTimeFormat: "DD-MMM-YYYY HH:mm",
      };
      const component = mountWithIntl(<Cell {...values} />);
      expect(component).toMatchSnapshot();
    });
  });
});
