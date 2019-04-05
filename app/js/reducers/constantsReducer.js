import { FETCH_CONCEPT_CONSTANT } from '../actions/actionTypes';

const initialState = {
  labResultsDidNotPerformReasonAnswer: {},
  labResultsTestLocationAnswer: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_CONCEPT_CONSTANT}_SUCCESS`: {
      return {
        ...state,
        [action.meta.constantName]: action.payload.data.answers,
      };
    }

    default:
      return state;
  }
};