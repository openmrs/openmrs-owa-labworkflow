import React from 'react';
import { Provider } from 'react-redux';
import { mountWithIntl } from '@openmrs/react-components';
import EncounterDisplay from '../../../app/js/components/EncounterDisplay';


let mountedComponent;


const getComponent = (state, props) => {
  const store = mockStore(state);

  if (!mountedComponent) {
    mountedComponent = mountWithIntl(
      <Provider store={store}>
        <EncounterDisplay {...props} />
      </Provider>
      ,
    );
  }

  return mountedComponent;
};

describe('EncounterDisplay Component', () => {

  it('should render for order value of type collectionDate for status of Reported results', (done) => {
    const props = {
      orderUUID: 'some-order-uuid',
      type: 'collectionDate',
    };

    const state = {
      labOrders: {
        orders: [
          {
            uuid: 'some-order-uuid',
            labResult: {
              resultStatus: "Reported",
              encounter: {
                uuid: 'some-encounter-uuid',
                encounterDatetime: '12/2/2018',
              },
            },
          },
        ],
      },
    };

    const component = getComponent(state, props);
    expect(component).toMatchSnapshot();
    done();
  });

  it('should render for order value of type status', (done) => {
    const props = {
      orderUUID: 'some-order-uuid',
      type: 'status',
    };

    const state = {
      labOrders: {
        orders: [
          {
            uuid: 'some-order-uuid',
            labResult: {
              encounter: {
                uuid: 'some-encounter-uuid',
                encounterDatetime: '12/2/2018',
              },
            },
          },
        ],
      },
    };
    const component = getComponent(state, props);
    expect(component).toMatchSnapshot();
    done();
  });
});