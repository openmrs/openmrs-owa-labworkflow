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
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_fr from 'react-intl/locale-data/fr';
import 'babel-polyfill';

import createStore from './redux-store';
import routes from './routes';
import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";

const messages = {
  fr: messages_fr,
  en: messages_en,
};
addLocaleData([...locale_en, ...locale_fr]);

const store = createStore();

const language = navigator.language.split(/[-_]/)[0]; // language without region code

render((
  <IntlProvider locale={language} messages={messages[language]}>
    <Provider store={store}>
      <HashRouter>
        {routes(store)}
      </HashRouter>
    </Provider>
  </IntlProvider>
), document.getElementById('app'));
