/*eslint-disable*/
import matchSorter from 'match-sorter';
import moment from 'moment';
import R from 'ramda';

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
  if (max && min) {
    return `${lowRange} - ${hiRange}`;
  }
  if (max || min) {
    return `${lowRange} > ${hiRange}`;
  }
  return '';
};

export const filterThrough = (filters, data) => {
  let originalData = data;

  if (filters.dateField === "order.dateActivated") {
    if (filters.dateToField && filters.dateFromField) {
      const filteredData  = getDateRange(originalData, filters.dateFromField, filters.dateToField, filters.dateField);
      originalData = filteredData;
    }
  }

  if (filters.nameField !== "") {
    const inputValue = filters.nameField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['patient.display'] });
    originalData = filteredData;
  }

  if (filters.testTypeField !== "All") {
    const inputValue = filters.testTypeField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
    originalData = filteredData;
  }

  if (filters.testStatusField !== "All") {
    let inputValue = filters.testStatusField;
    let filteredData = [];
    if (filters.testStatusField === "Cancelled/Expired") {
      const cancelledData = matchSorter(originalData, "Cancelled", { keys: ['labResult.resultStatus'] });
      const expiredData = matchSorter(originalData, "Expired", { keys: ['labResult.resultStatus'] });
      filteredData = cancelledData.concat(expiredData);
    } else {
      filteredData = matchSorter(originalData, inputValue, { keys: ['labResult.resultStatus'] });
    }
    originalData = filteredData;
  }

  if (filters.testStatusField === "All") {
    const filteredData = originalData.filter((data) => {
      if (!data.labResult) return false;
      return (data.labResult.resultStatus !== "Cancelled") && (data.labResult.resultStatus !== "Expired");
    });
    originalData = filteredData;
  }

  return originalData;
}

export const sortByDate = (path) => data => R.sort(
  (a, b) => dateToInt(R.path(path.split('.'))(a)) - dateToInt(R.path(path.split('.'))(b)), data
);

export const getSampleDate = (data) => {
  let sampleDate;
  if (data.encounter.obs) {
    const obs = data.encounter.obs;
    obs.some(eachObs => {
      if (eachObs.display.toLowerCase().match('sample date estimated')) {
        sampleDate = eachObs.value;
      }
    })
  }
  if (sampleDate) {
    return `${moment(sampleDate).format('DD-MMM-YYYY')}*`;
  } else if(data.encounter && data.encounter.encounterDatetime){
    return moment(data.encounter.encounterDatetime).format('DD-MMM-YYYY');
  } else {
    return "Unknown"
  }
}

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
}

export const calculateTableRows = (noOfRows) => ((parseInt(noOfRows) < 10) ? parseInt(noOfRows): 10)
