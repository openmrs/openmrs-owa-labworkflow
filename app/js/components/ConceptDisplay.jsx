import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValidations } from '@openmrs/react-components';
import { fetchConcept } from '../actions/labConceptsAction';
import { formatRangeDisplayText, hasMaxAndMinValues } from '../utils/helpers';

const {
  abnormalMaxValue,
  abnormalMinValue,
} = formValidations;

class ConceptDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      concept: {},
    };
  }

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
    const { concept, type, value } = this.props;

    if (!R.isEmpty(concept)) {
      if (type === "result") {
        const {
          hiNormal,
          lowNormal,
        } = concept;

        const validationRules = {
          "abnormal-min-value": !R.isEmpty(lowNormal) ? abnormalMinValue(lowNormal)(value) : undefined,
          "abnormal-max-value": !R.isEmpty(hiNormal) ? abnormalMaxValue(hiNormal)(value) : undefined,
        };

        const resultClassName = R.isEmpty(R.reject(R.isNil)(validationRules)) ? "" : 'abnormal-value';

        return (
          <span className={resultClassName}>
            {value}
          </span>
        );
      }

      if (type === "range") {
        return (
          <div className="table_cell test-type">
            {this.showRange()}
          </div>
        );
      }
    }

    return (
      <div className="spiner" />
    );
  }
}

ConceptDisplay.defaultProps = {
  value: '',
};

ConceptDisplay.propTypes = {
  concept: PropTypes.shape({}).isRequired,
  conceptUUID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

const mapStateToProps = ({
  conceptMembers,
}, {
  conceptUUID,
}) => ({
  concept: conceptMembers[conceptUUID] || {},
  conceptMembers,
});

export default connect(mapStateToProps)(ConceptDisplay);
