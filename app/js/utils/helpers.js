/*eslint-disable*/
import matchSorter from 'match-sorter';
import R from 'ramda';
import moment from "moment";
import { getIntl } from '@openmrs/react-components';
import { FULFILLER_STATUS, DEFAULT_TABLE_PAGE_SIZE } from "../constants";

const dateToInt = dateStr => new Date(dateStr).getTime();

export const getDateRange = (
  data,
  from,
  to,
  path,
) => data.filter(
  item => {
    if (R.path(path.split('.'))(item)) {
      const date = moment(R.path(path.split('.'))(item));
      return date.isSameOrAfter(moment(from).startOf('day')) && date.isSameOrBefore(moment(to).endOf('day'));
    }
  });

export const hasMaxAndMinValues = (
  members,
  list,
) => members.reduce((currentValue, item) => {
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

export const sortByDate = (path) => data => R.sort(
  (a, b) => dateToInt(R.path(path.split('.'))(a)) - dateToInt(R.path(path.split('.'))(b)), data
);

// filters a list of obs, removing an obs if it has the same concept, value, and obsDatetime as a previous obs in the list
// note that this a N^2 magnitude operation, but doesn't really seem to eat up much time relative to fetching the data from the server
export const filterDuplicates = data => data.reduce((acc, obs) => {
  if (acc.length === 0) {
    return [...acc, obs];
  } else {
    // if there's no matching obs amongst all previous, add it to the list
    if (!acc.some(previousObs => {
      return previousObs.obsDatetime === obs.obsDatetime
        && ((!isObject(previousObs.concept) || previousObs.concept.uuid === obs.concept.uuid))
        && ((isObject(previousObs.value) && isObject(obs.value) && previousObs.value.uuid === obs.value.uuid)
        || (!isObject(previousObs.value) && !isObject(obs.value) && previousObs.value === obs.value))
    })) {
      return [...acc, obs];
    } else {
      return acc;
    }
  }
},[]);

export const isObject = obj => {
  return typeof obj === 'object' && obj !== null;
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
};

export const computeUrl = (contextPath, url) => {
  if (url && (url !== 'null') && (url.length > 1)) {
    if (url.startsWith("/")) {
      url = url.substring(1); // skip the leading "/"
    }
  } else {
    url = '';
  }
  return url ? `/${contextPath}/${url}` : `/${contextPath}`;
}
export const getConceptShortName = (concept, locale) => {
  let conceptName = null;
  const localeShort = locale ? (locale.split('_'))[0] : "en";

  if (concept) {
    if (concept.names){
      let foundConcept;
      // first, try to find the preferred SHORT name in the current locale
      foundConcept = concept.names.find(name =>
        !name.voided && name.conceptNameType === 'SHORT' && name.locale === localeShort && name.localePreferred
      );
      if (!foundConcept) {
        // try to find the SHORT name in the current locale
        foundConcept = concept.names.find(name =>
          !name.voided && name.conceptNameType === 'SHORT' && name.locale === localeShort
        );
      }
      if (!foundConcept) {
        // attempt to find the preferred name in the locale
        foundConcept = concept.names.find(name =>
          !name.voided && name.locale === localeShort && name.localePreferred
        );
      }
      if (!foundConcept) {
        // attempt to find the preferred short name in English
        foundConcept = concept.names.find(name =>
            !name.voided && name.conceptNameType === 'SHORT' && name.locale === 'en' && name.localePreferred
        );
      }
      if (!foundConcept) {
        // attempt to find any short name in English
        foundConcept = concept.names.find(name =>
            !name.voided && name.conceptNameType === 'SHORT' && name.locale === 'en'
        );
      }
      if (!foundConcept) {
        // fall back to display
        conceptName = concept.display;
      } else {
        conceptName = foundConcept.name;
      }
    }
  }
  return conceptName;
};

export const calculateTableRows = (noOfRows) => ((parseInt(noOfRows) < DEFAULT_TABLE_PAGE_SIZE) ? parseInt(noOfRows): DEFAULT_TABLE_PAGE_SIZE)

export const computeResultStatus = (order) => {

  // FULFILLER_STATUS takes precedence (UHM-5053)
  if (order.fulfillerStatus) {
    return order.fulfillerStatus;
  }

  if (order.dateStopped !== null) {
    return FULFILLER_STATUS.CANCELED;
  }

  if (order.autoExpireDate !== null && moment(order.autoExpireDate).isBefore(new Date())) {
    return FULFILLER_STATUS.EXPIRED;
  }

  return FULFILLER_STATUS.ORDERED;
};

export const isCancelable = (order) => {
  return computeResultStatus(order) === FULFILLER_STATUS.ORDERED;
};
