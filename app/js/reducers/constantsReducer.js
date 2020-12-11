import {
  FETCH_CONCEPT_CONSTANT,
  SET_LAB_RESULTS_TO_DISPLAY_CONCEPT_SET,
} from '../actions/actionTypes';

const initialState = {
  labResultsDidNotPerformReasonAnswer: {},
  labResultsTestLocationAnswer: {},
  labResultsToDisplayConceptSet: {},
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

    default:
      return state;
  }
};
