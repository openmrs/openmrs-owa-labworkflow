import {
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';

import {
  formValueSelector,
  change,
  untouch,
  touch,
} from 'redux-form';
import { formUtil } from '@openmrs/react-components';

import {
  CLEAR_FORM_VALUES,
  RELOAD_FORM,
  CLEAR_FORM_CACHE,
} from '../actions/actionTypes';

import {
  cacheFormValue,
} from '../actions/formActions';

export function clearField(formId, fieldName, dispatch) {
  dispatch(change(formId, fieldName, null));
  dispatch(untouch(formId, fieldName));
}

function* resetFormFields(action) {
  const state = yield select();
  const { concept, formId, dispatch } = action;
  const selector = formValueSelector(formId);

  const isSet = concept.set;
  let fields = [];

  if (isSet) {
    fields = concept.setMembers.map((m) => m.uuid);
  } else {
    fields = [concept.uuid];
  }

  // select all fields to clear and cache value
  fields.forEach((field) => {
    const fieldName = formUtil.obsFieldName([concept.uuid, field], [concept.uuid, field]);
    const value = selector(state, fieldName);
    if (value) {
      clearField(formId, fieldName, dispatch);
      dispatch(cacheFormValue(formId, fieldName, value));
    }
  });
}

function* reloadFormSaga(action) {
  const { currentForm } = yield select();
  const { dispatch } = action;

  const fields = Object.keys(currentForm.fields);
  fields.forEach((field) => {
    const value = currentForm.fields[field];
    dispatch(change(currentForm.formId, field, value));
    dispatch(touch(currentForm.formId, field));
  });
  yield put({ type: CLEAR_FORM_CACHE });
}

export function* clearFormFieldsSaga() {
  yield takeEvery(CLEAR_FORM_VALUES, resetFormFields);
  yield takeEvery(RELOAD_FORM, reloadFormSaga);
}
