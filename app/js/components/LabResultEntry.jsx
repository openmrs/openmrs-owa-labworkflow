/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';

import {
  Grid,
  Row,
  FormGroup,
  ControlLabel,
  Col,
} from 'react-bootstrap';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import {
  CustomDatePicker,
  PatientHeader,
  EncounterFormPage,
  Obs,
  formValidations,
} from '@openmrs/react-components';

import patientAction from '../actions/patientAction';
import labConceptsAction from '../actions/labConceptsAction';
import constantsAction from '../actions/constantsAction';
import '../../css/lab-result-entry.scss';

const formatRangeDisplayText = (min, max, units) => {
  if (min && max && units) {
    return `${min}${units} - ${max}${units}`;
  }
  return '';
};

const {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
} = formValidations;


export class LabResultEntry extends PureComponent {
  constructor() {
    super();
    this.state = {
      patientHeaderDetail: false,
      selectedLabConcept: null,
      redirect: false,
    };
  }

  componentDidMount() {
    const { dispatch, history: { location: { state } } } = this.props;

    if (typeof state !== 'undefined') {
      const conceptUUID = state.concept.uuid;
      dispatch(patientAction.getPatient(state.patient.uuid));
      dispatch(labConceptsAction.fetchLabConcept(conceptUUID));
      dispatch(constantsAction.fetchLabResultsEncounterType());
    } else {
      this.shouldRedirect();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patientHeaderDetail, selectedLabConcept } = this.state;
    if (nextProps.patientHeaderDetail.uuid !== patientHeaderDetail.uuid) {
      this.setState({
        patientHeaderDetail: nextProps.patientHeaderDetail,
      });
    }
    if (!selectedLabConcept && nextProps.selectedLabConcept) {
      this.setState({
        selectedLabConcept: nextProps.selectedLabConcept,
      });
    }
  }

  shouldRedirect() {
    this.setState({ redirect: true });
  }

  renderForm = () => {
    const { selectedLabConcept, patientHeaderDetail } = this.state;
    const { CONSTANTS } = this.props;
    const encounterType = {
      uuid: CONSTANTS.labResultsEncounterType,
    };

    let observations;

    if (!selectedLabConcept) {
      observations = (<span />);
    } else {
      observations = (
        <Grid>
          <Row>
            {
              selectedLabConcept.set ? selectedLabConcept.setMembers.map(
                member => this.renderFormContent(member),
              ) : this.renderFormContent(selectedLabConcept, selectedLabConcept.answers)
            }
          </Row>
        </Grid>
      );

      return (
        <fieldset>
          <legend>Result Details:</legend>
          <Row bsClass="row result-range-header">
            <Col sm={3} />
            <Col sm={3} />
            <Col sm={3} />
            <Col sm={3}>
              <span className="range-header-text">NORMAL RANGE</span>
            </Col>
          </Row>
          <Row>
            <EncounterFormPage
              afterSubmitLink="/"
              backLink="/"
              encounterType={encounterType}
              formContent={observations}
              patient={patientHeaderDetail}
            />
          </Row>
        </fieldset>
      );
    }
    return null;
  }

  renderFormContent(member, selectedLabConceptAnswers) {
    const { conceptMembers } = this.props;
    const memberDetails = conceptMembers[member.uuid];
    if (memberDetails) {
      const {
        hiNormal,
        lowNormal,
        lowAbsolute,
        hiAbsolute,
        hiCritical,
        lowCritical,
        units,
      } = memberDetails;

      let obsProps = {
        concept: member.uuid,
        path: member.uuid,
      };

      const validations = [];
      const warnings = [];

      if (lowAbsolute) {
        const minRange = minValue(lowAbsolute);
        validations.push(minRange);
      }

      if (hiAbsolute) {
        const maxRange = maxValue(hiAbsolute);
        validations.push(maxRange);
      }

      if (hiCritical) {
        const abnormalMaxRange = abnormalMaxValue(hiCritical);
        warnings.push(abnormalMaxRange);
      }

      if (lowCritical) {
        const abnormalMinRange = abnormalMinValue(lowCritical);
        warnings.push(abnormalMinRange);
      }

      if (!R.isEmpty(validations)) {
        obsProps = {
          ...obsProps,
          validate: validations,
        };
      }

      if (!R.isEmpty(warnings)) {
        obsProps = {
          ...obsProps,
          warn: warnings,
        };
      }

      const normalRange = formatRangeDisplayText(lowNormal, hiNormal, units);
      return (
        <FormGroup controlId={member.display}>
          <Col componentClass={ControlLabel} sm={3}>
            {member.display}
          </Col>
          <Col sm={3}>
            <Obs
              {...obsProps}
            />
          </Col>
          <Col sm={3}>
            <span className="units">{units || ''}</span>
          </Col>
          <Col sm={3}>
            <span className="valid-range">
              {normalRange}
            </span>
          </Col>
        </FormGroup>
      );
    }
    return (
      <FormGroup controlId={member.display}>
        <Col componentClass={ControlLabel} sm={3}>
          {member.display}
        </Col>
        <Col sm={4}>
          {selectedLabConceptAnswers
            ? (
              <Obs
                conceptAnswers={selectedLabConceptAnswers}
                displayComponent="dropdown"
                dropDownTitle={member.display}
                concept={member.uuid}
                path={member.uuid}
              />
            ) : (
              <Obs
                concept={member.uuid}
                path={member.uuid}
              />
            )}
        </Col>
      </FormGroup>
    );
  }

  render() {
    const { patientHeaderDetail, redirect } = this.state;
    const { location } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        {patientHeaderDetail && <PatientHeader patient={patientHeaderDetail} />}
        {location.state
        && (
          <div>
            <h1>Test Results</h1>
            <div className="fieldset-container">
              <fieldset>
                <legend>Specimen Details:</legend>
                <div className="col-xs-12">
                  <CustomDatePicker
                    handleDateChange={() => {}}
                    labelClassName="date-picker-label"
                    label="Specimen Collection Date:"
                    defaultDate={moment().subtract(7, 'days')}
                    field="dateFromField"
                  />
                </div>
                <br />
                <br />
                <div className="col-xs-6">
                  <span>
                Test:&nbsp;
                    <span className="test-details">{location.state.display}</span>
                  </span>
                </div>
                <div className="col-xs-6">
                  <span>
                Urgency:&nbsp;
                    <span className="test-details">{location.state.urgency}</span>
                  </span>
                </div>
                <br />
                <br />
              </fieldset>
            </div>
          </div>
        )}
        <br />
        <br />
        <br />
        <div className="fieldset-container">
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

LabResultEntry.defaultProps = {
  selectedLabConcept: null,
};

LabResultEntry.propTypes = {
  patientHeaderDetail: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedLabConcept: PropTypes.object,
  location: PropTypes.object.isRequired,
  CONSTANTS: PropTypes.string.isRequired,
  conceptMembers: PropTypes.object.isRequired,
};

const mapStateToProps = ({
  patient: { patient },
  selectedLabConcept,
  CONSTANTS,
  conceptMembers,
}) => ({
  patientHeaderDetail: patient,
  selectedLabConcept,
  CONSTANTS,
  conceptMembers,
});

export default connect(mapStateToProps)(LabResultEntry);
