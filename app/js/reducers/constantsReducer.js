import {
  FETCH_CONCEPT_CONSTANT,
  SET_LAB_RESULTS_TO_DISPLAY_CONCEPT_SET,
  SET_LAB_CATEGORIES_SET,
} from '../actions/actionTypes';

const initialState = {
  labResultsDidNotPerformReasonAnswer: {},
  labResultsTestLocationAnswer: {},
  labResultsToDisplayConceptSet: {},
  labCategoriesSet: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_CONCEPT_CONSTANT}_SUCCESS`: {
      return {
        ...state,
        [action.meta.constantName]: action.payload.data.answers,
      };
    }

    case SET_LAB_RESULTS_TO_DISPLAY_CONCEPT_SET: {
      return {
        ...state,
        labResultsToDisplayConceptSet: action.set,
      };
    }

    case SET_LAB_CATEGORIES_SET: {
      return {
        ...state,
        labCategoriesSet: action.set,
      };
    }

    default:
      return state;
  }
};
