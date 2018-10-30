/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Header,
  setLocaleMessages,
  withLocalisation,
  Head,
} from '@openmrs/react-components';
import ReduxToastr from 'react-redux-toastr';
import BreadCrumb from './components/shared/BreadCrumb/BreadCrumb';
import LabResultEntry from './components/LabResultEntry';
import LabOrdersList from './components/LabOrdersList';
import LabResultsList from './components/LabResultsList';
import LabTrendsPage from './components/LabTrendsPage';
import Patientheader from './components/shared/PatientHeader';
import messagesEN from "./translations/en.json";
import messagesFR from "./translations/fr.json";

setLocaleMessages({
  en: messagesEN,
  fr: messagesFR,
});

const LocalizedHead = withLocalisation(Head);
const LocalizedBreadCrumb = withLocalisation(BreadCrumb);

// eslint-disable-next-line
export default store => (
  <div>
    <ReduxToastr />
    <LocalizedHead defaultTitle="OpenMRS Electronic Medical Record" id="app.title" />
    <Header />
    <LocalizedBreadCrumb />
    <Patientheader />
    <Switch>
      <Route exact path="/" component={withLocalisation(LabOrdersList)} />
      <Route path="/LabResultEntry" component={LabResultEntry} />
      <Route path="/labresults" component={LabResultsList} />
      <Route path="/labtrends" component={LabTrendsPage} />
    </Switch>
  </div>
);