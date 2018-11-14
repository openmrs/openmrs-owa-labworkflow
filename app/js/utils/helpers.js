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

export const formatRangeDisplayText = (min, max) => {
  if (min && max) {
    return `${min} - ${max}`;
  }
  return '';
};

export const filterThrough = (filters, data) => {
  let originalData = data;

  if (filters.nameField !== "") {
    const inputValue = filters.nameField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['patient.display'] });
    originalData = filteredData;
  }

  if (filters.dateToField && filters.dateFromField) {
    const filteredData = getDateRange(originalData, filters.dateFromField, filters.dateToField, filters.dateField);
    originalData = filteredData;
  }

  if (filters.testTypeField !== "All") {
    const inputValue = filters.testTypeField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
    originalData = filteredData;
  }

  if (filters.testStatusField !== "All") {
    const inputValue = filters.testStatusField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
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
