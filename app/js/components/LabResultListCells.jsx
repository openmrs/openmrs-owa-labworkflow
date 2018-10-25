import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import RangeCell from './RangeCell';
import { fetchConcept } from '../actions/labConceptsAction';


class Cell extends PureComponent {
  componentWillMount() {
    const {
      conceptUUID,
      dispatch,
      concept,
      status,
    } = this.props;

    if (R.isEmpty(concept) && status !== "Ordered") {
      dispatch(fetchConcept(conceptUUID));
    }
  }

  render() {
    const { value, columnName, concept, conceptUUID, type } = this.props;
    

    if (!R.isEmpty(concept)) {
      const isPanel = concept.set;
      const hasNoEncounter = value.status === 'Ordered';

      if (type === 'single') {
        if (columnName === 'TYPE') {
          return (
            <div className="table_cell type">
              <span>{value.order.display || value.concept.display}</span>
            </div>
          );
        }

        if (columnName === 'REQUEST DATE') {
          return (
            <div className="table_cell request-date">
              <span>{moment(value.order.dateActivated).format("DD-MMM-YYYY")}</span>
            </div>
          );
        }

        if (columnName === 'STATUS') {
          return (
            <div className="table_cell status">
              <span>{value.status}</span>
            </div>
          );
        }

        if (columnName === 'SAMPLE DATE' && !hasNoEncounter) {
          return (
            <div className="table_cell sample-date">
              <span>{moment(value.encounter.encouterDatetime).format("DD-MMM-YYYY") || ''}</span>
            </div>
          );
        }

        if (!isPanel && !hasNoEncounter) {
          const labResult = value.encounter.obs.filter(item => item.concept.uuid === conceptUUID);

          switch (columnName) {
            case 'RESULT':
              return (
                <div className="table_cell result">
                  <span>{labResult[0].value.display || labResult[0].value}</span>
                </div>
              );
            case 'NORMAL RANGE':
              return (
                <RangeCell concept={concept} />
              );
            default:
              return null;
          }
        }
        return null;
      }
      if (type === 'panel') {
        switch (columnName) {
          case 'TYPE': {
            return (
              <div className="table_cell type">
                <span>{value.concept.display}</span>
              </div>
            );
          }
          case 'RESULT':
            return (
              <div className="table_cell result">
                <span>{value.value.display || value.value}</span>
              </div>
            );
          case 'NORMAL RANGE':
            return (
              <RangeCell concept={concept} />
            );
      
          default:
            return null;
        }
      }
    }
    return (
      <div className="spiner" />
    );
  }
}

Cell.propTypes = {
  columnName: PropTypes.string.isRequired,
  value: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, props) => {
  const { conceptMembers } = state;
  const { value } = props;
  let conceptUUID;
  let concept;

  if (value.order === null) {
    conceptUUID = value.concept.uuid;
    concept = conceptMembers[conceptUUID] || {};
  } else {
    conceptUUID = value.order.concept.uuid;
    concept = conceptMembers[conceptUUID] || {};
    if (value.status === "Ordered") {
      concept = value.order.concept;
    }
  }

  return {
    concept,
    conceptMembers,
    conceptUUID,
    status: value.status,
  }
};

export default connect(mapStateToProps)(Cell);