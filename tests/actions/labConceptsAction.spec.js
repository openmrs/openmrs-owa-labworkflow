import {
  fetchLabConcept,
  setMember,
  setSelectedConcept,
  setFetchStatus,
} from '../../app/js/actions/labConceptsAction';

import {
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
  SET_CONCEPT,
  SET_FETCH_STATUS,
} from '../../app/js/actions/actionTypes';

const {
  moxios,
  mockStore,
} = global;

const mockConcept = {
  uuid: '1234-abcd',
  display: "Temps de céphaline",
  set: false,
  answers: [],
  setMembers: [],
  hiNormal: null,
  hiAbsolute: null,
  hiCritical: null,
  lowNormal: null,
  lowAbsolute: 0,
  lowCritical: null,
  units: "Seconds",
};


describe('setMember action', () => {
  it('should set concept member in state', () => {
    const expectedActionTypes = [
      `${SET_CONCEPT_MEMBER}_1`,
    ];

    const store = mockStore({});
    store.dispatch(setMember(mockConcept, 1));
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});

describe('setSelectedConcept action', () => {
  it('should set the currently selected concept in state', () => {
    const expectedActionTypes = [
      SET_CONCEPT,
    ];

    const store = mockStore({});
    store.dispatch(setSelectedConcept());
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});

describe('setFetchStatus action', () => {
  it('should set Fetch status in state', () => {
    const expectedActionTypes = [
      SET_FETCH_STATUS,
    ];

    const store = mockStore({});
    store.dispatch(setFetchStatus(true));
    const dispatchedActions = store.getActions();
    const dispatchedActionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
});
