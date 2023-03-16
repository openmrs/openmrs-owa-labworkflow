import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ConceptDisplay from "../ConceptDisplay";
import {
  getConceptShortName,
} from '../../utils/helpers';

function Cell({
  obs, columnName, locale, onLoaded,
}) {
  // TODO use concept display for this?
  if (columnName === 'TEST TYPE') {
    return (
      <div className="table_cell type">
        <span>{obs.concept ? getConceptShortName(obs.concept, locale) : ''}</span>
      </div>
    );
  }

  if (columnName === 'DATE') {
    return (
      <div className="table_cell date">
        <span>{moment(obs.obsDatetime).format("DD-MMM-YYYY") || ''}</span>
      </div>
    );
  }

  if (columnName === 'RESULT') {
    return (
      <div className="table_cell result">
        <ConceptDisplay
          conceptUUID={obs.concept.uuid}
          type="result"
          value={typeof obs.value === 'object' ? getConceptShortName(obs.value, locale) : obs.value}
          onLoaded={onLoaded}
        />
      </div>
    );
  }

  if (columnName === 'NORMAL RANGE') {
    return (
      <ConceptDisplay conceptUUID={obs.concept.uuid} type="range" onLoaded={onLoaded} />
    );
  }

  return (
    <div className="spinner" />
  );
}

Cell.propTypes = {
  columnName: PropTypes.string.isRequired,
  obs: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
  onLoaded: PropTypes.func.isRequired,
};

export default Cell;
