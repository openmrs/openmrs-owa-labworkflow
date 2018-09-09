/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { Header } from '@openmrs/react-components';
import BreadCrumb from './components/shared/BreadCrumb/BreadCrumb';
import LabResultEntry from './components/LabResultEntry/LabResultEntry';

import App from './components/App';

// Demo component as placeholder for fake breadcrumb page
const FakeBreadcrumbPage = () => (
  <div>FakeBreadcrumbPage</div>
);

// eslint-disable-next-line
export default store => (
  <div>
    <Header />
    <BreadCrumb />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/LabResultEntry" component={LabResultEntry} />
      <Route exact path="/FakeBreadcrumbPage" component={FakeBreadcrumbPage} />
    </Switch>
  </div>
);