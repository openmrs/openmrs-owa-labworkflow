import React, { PureComponent } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import {
  formValidations,
} from '@openmrs/react-components';
import { formatRangeDisplayText } from '../utils/helpers';

const {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  maxDateValue,
} = formValidations;

class RangeCell extends PureComponent {
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
      <div>
        <span>Loading</span>
      </div>
    );
  }
}

RangeCell.propTypes = {
  concept: PropTypes.shape({}).isRequired,
}


export default RangeCell;
