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
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import 'babel-polyfill';

import createStore from './redux-store';
import routes from './routes';
import messagesEN from "./translations/en.json";
import messagesFR from "./translations/fr.json";

const localeData = {
  fr: messagesFR,
  en: messagesEN,
};

addLocaleData([...en, ...fr]);

const store = createStore();

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0])
                     || navigator.language
                     || navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
if (!window.intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/fr.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/fr.js');
    render((
      <IntlProvider locale={languageWithoutRegionCode} messages={messages}>
        <Provider store={store}>
          <HashRouter>
            {routes(store)}
          </HashRouter>
        </Provider>
      </IntlProvider>
    ), document.getElementById('app'));
  });
} else {
  render((
    <IntlProvider locale={languageWithoutRegionCode} messages={messages}>
      <Provider store={store}>
        <HashRouter>
          {routes(store)}
        </HashRouter>
      </Provider>
    </IntlProvider>
  ), document.getElementById('app'));
}
