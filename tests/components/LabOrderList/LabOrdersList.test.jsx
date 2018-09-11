import React from 'react';
import LabOrdersListContainer,
{
  LabOrdersList,
  mapStateToProps,
} from '../../../app/js/components/LabOrdersList';

let mountedComponent;

const { mountWithIntl } = global;

const orders = [
  {
    orderNumber: "ORD-1",
    display: "Hémogramme automatisé",
    urgency: 'ROUTINE',
    dateActivated: "2018-08-30T17:34:19.000+0100",
    patient: {
      display: "Y2A7LR - williams willy john",
    },
  },
];

const props = {
  dispatch: jest.fn(),
  labOrders: {
    orders,
    isLoading: false,
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
    const state = {
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
