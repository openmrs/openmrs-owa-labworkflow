import React from 'react';
import { Provider } from 'react-redux';
import { mountWithIntl } from '@openmrs/react-components';
import ConceptDisplay from '../../../app/js/components/ConceptDisplay';


let mountedComponent;


const getComponent = (state, props) => {
  const store = mockStore(state);

  if (!mountedComponent) {
    mountedComponent = mountWithIntl(
      <Provider store={store}>
        <ConceptDisplay {...props} />
      </Provider>
      ,
    );
  }

  return mountedComponent;
};

describe('ConceptDisplay Component', () => {
  it('should render for concept value of type result', (done) => {
    const props = {
      conceptUUID: 'some-concept-uuid',
      type: 'result',
      value: 30,
    };

    const state = {
      openmrs: {
        session: {
          locale: 'en'
        }
      },
      conceptMembers: {
        'some-concept-uuid': {
          hiNormal: 50,
          lowNormal: 40,
          units: 'mmgh',
        },
      },
    };
    const component = getComponent(state, props);
    expect(component).toMatchSnapshot();
    done();
  });

  it('should render for concept value of type range when there is valid units', (done) => {
    const props = {
      conceptUUID: 'some-concept-uuid',
      type: 'range',
      value: 30,
    };

    const state = {
      conceptMembers: {
        'some-concept-uuid': {
          hiNormal: 50,
          lowNormal: 40,
          units: 'mmgh',
        },
      },
    };

    const component = getComponent(state, props);
    expect(component).toMatchSnapshot();
    done();
  });

  it('should render for concept value of type range when unit is null', (done) => {
    const props = {
      conceptUUID: 'some-concept-uuid',
      type: 'range',
      value: 30,
    };

    const state = {
      conceptMembers: {
        'some-concept-uuid': {
          hiNormal: 50,
          lowNormal: 40,
        },
      },
    };

    const component = getComponent(state, props);
    expect(component).toMatchSnapshot();
    done();
  });
});
