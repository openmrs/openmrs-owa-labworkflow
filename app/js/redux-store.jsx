/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { sagas as openmrsSagas, reducers as openmrsReducers } from '@openmrs/react-components';
import { reducer as reduxFormReducer } from 'redux-form';

import * as reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunkMiddleware, promiseMiddleware()];

export default function () {
  const reducer = combineReducers({
    openmrs: openmrsReducers,
    form: reduxFormReducer,
    labWorkflow: reducers,
  });
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension && process.env.NODE_ENV !== 'production'
        ? window.devToolsExtension() : f => f,
    ),
  );
  sagaMiddleware.run(openmrsSagas);
  return store;
}
