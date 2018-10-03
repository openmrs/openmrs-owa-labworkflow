/*eslint-disable*/


const dateToInt = dateStr => new Date(dateStr).getTime();

export const getDateRange = (
  data,
  from,
  to,
  path,
) => data.filter(
  item => dateToInt(from) <= dateToInt(item[path]) && dateToInt(to) >= dateToInt(item[path]),
);

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

export const formatRangeDisplayText = (min, max, units) => {
  if (min && max && units) {
    return `${min}${units} - ${max}${units}`;
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
    const filteredData = getDateRange(originalData, filters.dateFromField, filters.dateToField, 'dateActivated');
    originalData = filteredData;
  }

  if (filters.testTypeField !== "All") {
    const inputValue = filters.testTypeField;
    const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
    originalData = filteredData;
  }
  return originalData;
}
