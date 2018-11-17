import {
  selectedPatientReducer,
  selectedLabConceptReducer,
  patientsReducer,
  conceptMembersReducer,
} from '../../app/js/reducers/patientsReducer';
import initialState from '../../app/js/reducers/initialState';
import {
  ADD_PATIENT,
  SET_SELECTED_PATIENT,
  FETCH_LAB_CONCEPT,
  SET_CONCEPT_MEMBER,
} from '../../app/js/actions/actionTypes';

describe('patientsReducer', () => {
  it('returns the state, when no action type is matched', () => {
    const randomAction = {
      type: 'SOME_RANDOM_ACTION',
    };
    const nextState = patientsReducer(initialState, randomAction);
    expect(nextState.patients).toEqual({});
    expect(nextState.selectedPatient).toEqual({});
  });
  it('adds the patient to the state, when the patient uuid is not set in state', () => {
    const addPatientAction = {
      type: ADD_PATIENT,
      patient: {
        uuid: '1234',
        display: 'rowland',
      },
    };

    const nextState = patientsReducer({}, addPatientAction);
    expect(nextState).toEqual({
      1234: {
        uuid: '1234',
        display: 'rowland',
      },
    });
  });
  it('returns the state, when the patient uuid is already set in state', () => {
    const addPatientAction = {
      type: ADD_PATIENT,
      patient: {
        uuid: '1234',
        display: 'rowland',
      },
    };
    const state = {
      1234: {
        uuid: '1234',
        display: 'rowland',
      },
    };
    const nextState = patientsReducer(state, addPatientAction);
    expect(nextState).toEqual(state);
  });
});

describe('selectedPatientReducer', () => {
  it('returns the default state, when no action type is matched', () => {
    const randomAction = {
      type: 'SOME_RANDOM_ACTION',
    };
    const nextState = selectedPatientReducer(initialState, randomAction);
    expect(nextState.selectedPatient).toEqual({});
  });
  it('adds the patient to the state, when the patient uuid is not set in state', () => {
    const selectedPatientAction = {
      type: SET_SELECTED_PATIENT,
      patientUUID: '1234',
    };

    const nextState = selectedPatientReducer({}, selectedPatientAction);
    expect(nextState).toEqual('1234');
  });
});

describe('selectedLabConceptReducer', () => {
  it('returns the default state, when no action type is matched', () => {
    const randomAction = {
      type: 'SOME_RANDOM_ACTION',
    };
    const nextState = selectedLabConceptReducer(initialState, randomAction);
    expect(nextState.selectedPatient).toEqual({});
  });
  it('adds the concept to the state, whenever it is selected', () => {
    const selectedConceptAction = {
      type: `${FETCH_LAB_CONCEPT}_SUCCESS`,
      payload: {
        data: {
          details: 'some concept detail',
        },
      },
    };

    const nextState = selectedLabConceptReducer({}, selectedConceptAction);
    expect(nextState).toEqual(selectedConceptAction.payload.data);
  });
});

describe('conceptMembersReducer', () => {
  it('should return the state when no action type is matched', () => {
    const randomAction = {
      type: 'SOME_RANDOM_ACTION',
    };
    const nextState = conceptMembersReducer({}, randomAction);
    expect(nextState).toEqual({});
  });
  it('should set the appriopriate state for SET_CONCEPT_MEMBER action type', () => {
    const setConceptMemberAction = {
      type: SET_CONCEPT_MEMBER,
      member: {
        uuid: '1234-wxyz',
        unit: 'mmgh',
        hiNormal: 100,
        lowNormal: 11,
      },
    };
    const nextState = conceptMembersReducer({}, setConceptMemberAction);
    expect(nextState).toEqual({
      '1234-wxyz': setConceptMemberAction.member,
    });
  });
});
