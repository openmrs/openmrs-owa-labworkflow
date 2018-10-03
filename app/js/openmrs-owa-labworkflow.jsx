/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


import createStore from './redux-store';
import routes from './routes';

const store = createStore();

render((
  <Provider store={store}>
    <HashRouter>
      {routes(store)}
    </HashRouter>
  </Provider>
), document.getElementById('app'));
