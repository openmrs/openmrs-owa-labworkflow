/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'babel-polyfill';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import '../css/openmrs-owa-labworkflow.scss'
import singleSpaReact from 'single-spa-react'

import { history } from './redux-store';
import exportStore from './export-store';

import routes from './routes';

import '../../node_modules/toastr/build/toastr.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
})

export const bootstrap = lifecycles.bootstrap
export const mount = lifecycles.mount
export const unmount = lifecycles.unmount

function Root() {
  return (
    <Provider store={exportStore}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          {routes(exportStore)}
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>
  )
}