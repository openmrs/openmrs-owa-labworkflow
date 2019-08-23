import { globalPropertyActions, selectors } from '@openmrs/react-components';


/* Define all global properties needed in OWA here
    * labResultsEntryEncounterType: encounter type to use when creating and editing lab results
    * labResultsEntryEncounterTypes: encounter types to search through when displaying lab results
      (not mandatory, will default to encounter type specified in labResultsEntryEncounterType)
 */

export const APP_GLOBAL_PROPERTIES = {
  labResultsTestOrderType: "labworkflowowa.testOrderType",
  labResultsEntryEncounterType: "labworkflowowa.labResultsEntryEncounterType",
  labResultsEncounterTypes: "labworkflowowa.labResultsEncounterTypes",
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
