import { globalPropertyActions, selectors, getIntl } from '@openmrs/react-components';
import R from "ramda";

/* Define all global properties needed in OWA here
    * labResultsEntryEncounterType: encounter type to use when creating and editing lab results
    * labResultsEntryEncounterTypes: encounter types to search through when displaying lab results
      (not mandatory, will default to encounter type specified in labResultsEntryEncounterType)
    * labCategoriesConceptSet: if set, will add category filters to the Lab Results List based on
    *   top-level sets within this set, and will limit labs displayed to those LabSets and Tests
    *   in this concept set (not mandatory)
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
  enableLabelPrinting: "labworkflowowa.enableLabelPrinting",
  labelPrintingEndpoint: "labworkflowowa.labelPrintingEndpoint",
  ordersBatchSize: "labworkflowowa.ordersBatchSize",
  orderLabTestLink: "labworkflowowa.orderLabTestLink",
  labCategoriesConceptSet: "labworkflowowa.labCategoriesConceptSet",
  labOrderablesConceptSet: "orderentryowa.labOrderablesConceptSet",
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

export const selectLocale = (state) => R.path(['openmrs', 'session', 'locale'], state);

export const getMessage = (state, msgId, msgDefault) => getIntl(R.path(['openmrs', 'session', 'locale'], state)).formatMessage({ id: msgId, defaultMessage: msgDefault });
