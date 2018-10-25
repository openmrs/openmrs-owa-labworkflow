import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  formValidations,
} from '@openmrs/react-components';
import { fetchConcept } from '../actions/labConceptsAction';
import { formatRangeDisplayText, hasMaxAndMinValues } from '../utils/helpers';

const {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  maxDateValue,
} = formValidations;

class RangeCell extends PureComponent {
  state = {
    concept: {},
  };

  componentWillMount() {
    const { conceptUUID, dispatch, concept } = this.props;
    if (R.isEmpty(concept)) {
      dispatch(fetchConcept(conceptUUID));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { concept } = this.state;
    if (nextProps.concept !== concept) {
      this.setState({
        concept,
      });
    }
  }

  showRange() {
    const { concept } = this.props;
    const {
      hiNormal,
      lowNormal,
      units,
    } = concept;

    const normalRange = formatRangeDisplayText(lowNormal, hiNormal);

    const unit = units || '';

    const displayText = `${normalRange} ${unit}`;

    return (
      <span>
        {displayText}
      </span>
    );
  }

  render() {
    const { concept } = this.props;

    if (!R.isEmpty(concept)) {
      return (
        <div className="table_cell test-type">
          {this.showRange()}
        </div>
      );
    }

    return (
      <div className="spiner" />
    );
  }
}

RangeCell.propTypes = {
  concept: PropTypes.shape({}).isRequired,
  conceptUUID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  conceptMembers,
}, {
 conceptUUID,
}) => ({
  concept: conceptMembers[conceptUUID] || {},
  conceptMembers,
});

export default connect(mapStateToProps)(RangeCell);
