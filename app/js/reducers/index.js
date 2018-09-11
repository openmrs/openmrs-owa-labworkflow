/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducers as openmrsReducers } from '@openmrs/react-components';
import labOrderReducer from './labOrdersReducer';
import patientReducer from './patientReducer';


export default combineReducers({
  openmrs: openmrsReducers,
  form: reduxFormReducer,
  labOrders: labOrderReducer,
  patient: patientReducer,
});
