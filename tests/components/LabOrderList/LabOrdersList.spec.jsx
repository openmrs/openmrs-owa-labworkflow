import React from 'react';
import { mountWithIntl } from '@openmrs/react-components';
import LabOrdersListContainer,
{
  LabOrdersList,
  mapStateToProps,
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
    const state = {
      openmrs: {
        CONSTANTS: {
          dateAndTimeFormat: '',
        },
      },
      labOrders: {
        orders,
        isLoading: false,
      },
    };
    const component = getComponent();
    mapStateToProps(state);
    expect(component).toMatchSnapshot();
  });
});
