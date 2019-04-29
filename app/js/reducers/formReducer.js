import {
  CACHE_FORM_VALUE,
  CLEAR_FORM_CACHE,
} from '../actions/actionTypes';


const initialState = {
  formId: null,
  fields: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CACHE_FORM_VALUE: {
      const { formId, field, value } = action;
      return {
        ...state,
        formId,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };
    }

    case CLEAR_FORM_CACHE:
      return initialState;

    default:
      return state;
  }
};