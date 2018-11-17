import { getConcept, setConceptMembers, setLabConcepts } from '../../app/js/sagas/conceptSaga';
import { FETCH_LAB_CONCEPT, SET_FETCH_STATUS } from '../../app/js/actions/actionTypes';

let sagaTester;


const concept = {
  display: "Panel coagulation",
  setMembers: [
    {
      uuid: "hu-89i-9h-99",
      display: "Temps de céphaline",
    },
    {
      uuid: "f611-1dc7d-b4b8-448a",
      display: "Temps de Prothrombine",
    },
    {
      uuid: "16e5-bc8-a264-cce5",
      display: "Rapport international normalisé",
    },
  ],
};

describe('setLabConcepts saga', () => {
  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(setLabConcepts);
  });
  it('should run setLabConcepts saga', () => {
    const expectedActions = [
      `${FETCH_LAB_CONCEPT}_SUCCESS`,
      SET_FETCH_STATUS,
    ];

    sagaTester.dispatch({ type: `${FETCH_LAB_CONCEPT}_SUCCESS`, payload: { data: concept } });

    expect(
      sagaTester.getCalledActions().map(
        action => action.type,
      ),
    ).toEqual(expectedActions);
    expect(sagaTester.wasCalled(`${FETCH_LAB_CONCEPT}_SUCCESS`)).toEqual(true);
  });
});
