import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mountWithIntl } from '@openmrs/react-components';


import BreadCrumb from '../../../app/js/components/shared/BreadCrumb/BreadCrumb';

let mountedComponent;
const state = {
  patients: {
  },
  selectedPatient: '',
};
const store = mockStore(state);

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mountWithIntl(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Provider store={store}>
          <BreadCrumb />
        </Provider>
      </MemoryRouter>,
    );
  }
  return mountedComponent;
};

describe('Breadcrumb component', () => {
  it('should take a snapshot on initial render', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
