/*eslint-disable*/
import matchSorter from 'match-sorter';
import R from 'ramda';
import moment from "moment";

const dateToInt = dateStr => new Date(dateStr).getTime();

export const getDateRange = (
  data,
  from,
  to,
  path,
) => data.filter(
  item => {
    if (R.path(path.split('.'))(item)) {
      return (dateToInt(from) <= dateToInt(R.path(path.split('.'))(item)) && dateToInt(to) >= dateToInt(R.path(path.split('.'))(item)))
    }
    return true;
  });

export const hasMaxAndMinValues = (
  memebers,
  list,
) => memebers.reduce((currentValue, item) => {
  const member = list[item.uuid];
  if (member && member.hiNormal !== 'null' && member.lowNormal !== null) {
    return true;
  }
  return currentValue;
}, false);

export const formatRangeDisplayText = (min = " ", max = " ") => {
  let lowRange = "";
  let hiRange = "";
  if (min) {
    lowRange = min;
  }
  if (max) {
    hiRange = max;
  }
  if(max && min) {
    return `${lowRange} - ${hiRange}`;
  }
  if(max || min) {
    if(max) {
      return `< ${hiRange}`;
    }
    if(min) {
      return `> ${lowRange}`;
    }
  }
  return '';
};

export const filterThrough = (filters, data) => {
  let originalData = data;

  if (filters.dateField === "obsDatetime") {
    if (filters.dateToField && filters.dateFromField) {
      originalData  = getDateRange(originalData, filters.dateFromField, filters.dateToField, filters.dateField);
    }
  }

  if (filters.nameField !== "") {
    const inputValue = filters.nameField;
    originalData = matchSorter(originalData, inputValue, { keys: [{ threshold: matchSorter.rankings.CONTAINS, key: 'patient.display' }] });
  }

  if ( filters.testTypeField !== "All" ) {
    const inputValue = filters.testTypeField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
    originalData = filteredData;
  }

   if ( filters.testStatusField === "" ) {
    //empty filter, no Status value was selected
    //display all orders except the Canceled or Expired
    originalData = originalData.filter((data) => {
      const status = computeResultStatus(data);
      return status !== 'CANCELED' && status !== 'EXPIRED';
    });
  } else if ( filters.testStatusField === "ALL" ) {
      // display all orders regardless the status
      originalData= originalData.filter((data) => {
        return true;
    });
  } else if ( filters.testStatusField === "CANCELED_EXPIRED" ) {
    // display all orders that have an Canceled or Expired status
    originalData= originalData.filter((data) => {
      const status = computeResultStatus(data);
      return status === 'CANCELED' || status === 'EXPIRED';
    });
  } else if (filters.testStatusField !== "") {
     originalData= originalData.filter((data) => {
       const status = computeResultStatus(data);
       return status === filters.testStatusField;
     });
  }

  return originalData;
};

export const sortByDate = (path) => data => R.sort(
  (a, b) => dateToInt(R.path(path.split('.'))(a)) - dateToInt(R.path(path.split('.'))(b)), data
);


export const getResultValue = (data) => {
  let resultValue;
  if(data.value === null) {
    resultValue = '';
  } else if(data.value.display || data.value) {
    resultValue = data.value.display || data.value;
  } else {
    resultValue = '';
  }
  return resultValue;
};

export const getConceptShortName = (concept, locale) => {
  let conceptName;
  const localeShort = locale ? (locale.split('_'))[0] : "en";

  if(concept) {
    if (concept.names && concept.names.length > 0){
      let foundConcept;
      // first, try to find the SHORT name in the current locale
      foundConcept = concept.names.find(function(name){
        return (!name.voided && name.conceptNameType === 'SHORT' && name.locale === localeShort);
      });

      if(typeof foundConcept === 'undefined' || foundConcept == null) {
        // attempt to find the preferred name in the locale
        foundConcept = concept.names.find(function(name){
          return (!name.voided && name.locale === localeShort && name.localePreferred);
        });
      }
      if(typeof foundConcept === 'undefined' || foundConcept == null) {
        // could not find any locale preferred name
        conceptName = concept.display;
      } else {
        conceptName = foundConcept.name;
      }
    }
  }
  return conceptName;
};

export const calculateTableRows = (noOfRows) => ((parseInt(noOfRows) < 10) ? parseInt(noOfRows): 10)

export const computeResultStatus = (order) => {

  if (order.fulfillerStatus) {
    return order.fulfillerStatus;
  }

  if (order.dateStopped !== null) {
    return "CANCELED";
  }

  if (order.autoExpireDate !== null && moment(order.autoExpireDate).isBefore(new Date())) {
    return "EXPIRED";
  }
  return "ORDERED";
};

export const isCancelable = (order) => {
  return computeResultStatus(order) === 'ORDERED';
};
