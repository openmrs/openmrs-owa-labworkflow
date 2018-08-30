import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import BreadCrumb from '../../../app/js/components/shared/BreadCrumb/BreadCrumb';

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <MemoryRouter initialEntries={[ { pathname: '/', key: 'testKey' } ]}>
        <BreadCrumb />
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
