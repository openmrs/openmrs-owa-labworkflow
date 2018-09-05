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

