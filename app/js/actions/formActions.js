import { CLEAR_FORM_VALUES, CACHE_FORM_VALUE, RELOAD_FORM } from './actionTypes';

export const clearFormValues = (concept, formId, dispatch) => ({
  type: CLEAR_FORM_VALUES,
  concept,
  formId,
  dispatch,
});

export const cacheFormValue = (formId, field, value) => ({
  type: CACHE_FORM_VALUE,
  formId,
  field,
  value,
});

export const reloadForm = dispatch => ({
  type: RELOAD_FORM,
  dispatch,
});