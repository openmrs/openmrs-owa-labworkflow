import { globalPropertyActions, selectors } from '@openmrs/react-components';


// define all global properties needed iin this owa here
export const APP_GLOBAL_PROPERTIES = {
  labResultsTestOrderType: "labworkflowowa.testOrderType",
  labResultsEncounterType: "labworkflowowa.labResultsEncounterType",
  labResultsDateConcept: "labworkflowowa.labResultsDateConcept",
  labResultsDidNotPerformAnswer: "labworkflowowa.didNotPerformAnswer",
  labResultsDidNotPerformQuestion: "labworkflowowa.didNotPerformQuestion",
  labResultsDidNotPerformReasonQuestion: "labworkflowowa.didNotPerformReason",
  labResultsTestOrderNumberConcept: "labworkflowowa.testOrderNumberConcept",
  labResultsTestLocationQuestion: "labworkflowowa.locationOfLaboratory",
  labResultsEstimatedCollectionDateQuestion: "labworkflowowa.estimatedCollectionDateQuestion",
  labResultsEstimatedCollectionDateAnswer: "labworkflowowa.estimatedCollectionDateAnswer",
  dateAndTimeFormat: "labworkflowowa.dateAndTimeFormat",
};

export const loadGlobalProperties = (dispatch) => {
  const properties = Object.values(APP_GLOBAL_PROPERTIES);
  properties.forEach((property) => {
    dispatch(globalPropertyActions.fetchGlobalProperty(property));
  });
};

export const selectProperty = (state, property) => selectors.getGlobalProperty(
  state,
  APP_GLOBAL_PROPERTIES[property],
);
