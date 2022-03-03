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
import { reducer as toastrReducer } from 'react-redux-toastr';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { reducers as openmrsReducers } from '@openmrs/react-components';
import labOrderReducer from './labOrdersReducer';
import labTestResultsReducer from './labTestResultsReducer';
import patientReducer from './patientReducer';
import filtersReducer from './filtersReducer';
import constantsReducer from './constantsReducer';
import {
  patientsReducer,
  selectedPatientReducer,
  selectedLabConceptReducer,
  conceptMembersReducer,
  fetchStatusReducer,
} from './patientsReducer';
import formReducer from './formReducer';

const filtersPersistConfig = {
  key: 'filters',
  storage: storageSession,
  stateReconciler: autoMergeLevel2,
};

export default combineReducers({
  openmrs: openmrsReducers,
  form: reduxFormReducer,
  currentForm: formReducer,
  toastr: toastrReducer,
  labOrders: labOrderReducer,
  labTestResults: labTestResultsReducer,
  patient: patientReducer,
  patients: patientsReducer,
  selectedPatient: selectedPatientReducer,
  selectedLabConcept: selectedLabConceptReducer,
  conceptMembers: conceptMembersReducer,
  fetchStatus: fetchStatusReducer,
  filters: persistReducer(filtersPersistConfig, filtersReducer),
  CONSTANTS: constantsReducer,
});
