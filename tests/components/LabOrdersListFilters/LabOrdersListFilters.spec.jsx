import React from 'react';
import { mountWithIntl } from '@openmrs/react-components';
import LabOrderListFilters from '../../../app/js/components/LabOrdersListFilters';


let mountedComponent;

const props = {
  handleFieldChange: jest.fn(),
  clearNameEMRField: jest.fn(),
  labTests: ['Hémogramme automatisé'],
  nameField: '',
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mountWithIntl(<LabOrderListFilters {...props} />);
  }
  return mountedComponent;
};


describe('<LabOrdersList /> component', () => {
  it('renders correctly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
