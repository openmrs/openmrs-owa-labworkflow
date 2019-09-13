/*eslint-disable*/
import matchSorter from 'match-sorter';
import moment from 'moment';
import R from 'ramda';
import { getIntl } from '@openmrs/react-components';
import exportStore  from '../export-store';

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

  const locale = R.path(['openmrs', 'session', 'locale'], exportStore.getState());
  const allMsg = getIntl(locale).formatMessage({
    id: "reactcomponents.all",
    defaultMessage: "All"
  });
  const canceled = getIntl(locale).formatMessage({
      id: "app.labResult.status.canceled",
      defaultMessage: "Canceled"
    });
  const expired = getIntl(locale).formatMessage({
      id: "app.labResult.status.expired",
      defaultMessage: "Expired"
    });
  const canceledExpired = canceled + "/" + expired;

  if (filters.dateField === "obsDatetime") {
    if (filters.dateToField && filters.dateFromField) {
      const filteredData  = getDateRange(originalData, filters.dateFromField, filters.dateToField, filters.dateField);
      originalData = filteredData;
    }
  }

  if (filters.nameField !== "") {
    const inputValue = filters.nameField;
    const filteredData = matchSorter(originalData, inputValue, { keys: [{ threshold: matchSorter.rankings.CONTAINS, key: 'patient.display' }] });
    originalData = filteredData;
  }

  if ((filters.testTypeField.length > 0) && filters.testTypeField !== allMsg) {
    const inputValue = filters.testTypeField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
    originalData = filteredData;
  }

  if ((filters.testStatusField.length > 0) && filters.testStatusField !== allMsg) {
    let inputValue = filters.testStatusField;
    let filteredData = [];
    if (filters.testStatusField === canceledExpired) {
      const cancelledData = matchSorter(originalData, canceled, { keys: ['labResult.resultStatus'] });
      const expiredData = matchSorter(originalData, expired, { keys: ['labResult.resultStatus'] });
      filteredData = cancelledData.concat(expiredData);
    } else {
      filteredData = matchSorter(originalData, inputValue, { keys: ['labResult.resultStatus'] });
    }
    originalData = filteredData;
  }

  if ((filters.testStatusField.length === 0) || filters.testStatusField === allMsg) {
    const filteredData = originalData.filter((data) => {
      if (!data.labResult) return false;
      return (data.labResult.resultStatus !== canceled) && (data.labResult.resultStatus !== expired);
    });
    originalData = filteredData;
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

export const calculateTableRows = (noOfRows) => ((parseInt(noOfRows) < 10) ? parseInt(noOfRows): 10)
