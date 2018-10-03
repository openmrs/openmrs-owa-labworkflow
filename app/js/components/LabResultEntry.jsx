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
import { Loader } from '@openmrs/react-components';
import { formValueSelector } from 'redux-form';
import R from 'ramda';

import {
  Grid,
  Row,
  FormGroup,
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
import { fetchLabConcept } from '../actions/labConceptsAction';
import '../../css/lab-result-entry.scss';
import { formatRangeDisplayText, hasMaxAndMinValues } from '../utils/helpers';


const {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  maxDateValue,
} = formValidations;

export class LabResultEntry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patientHeaderDetail: false,
      redirect: false,
    };
  }

  componentWillMount() {
    const { dispatch, history: { location: { state } } } = this.props;
    if (typeof state !== 'undefined') {
      const conceptUUID = state.concept.uuid;
      dispatch(patientAction.getPatient(state.patient.uuid));
      dispatch(fetchLabConcept(conceptUUID));
    } else {
      this.shouldRedirect();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patientHeaderDetail } = this.props;

    if (nextProps.patientHeaderDetail.uuid !== patientHeaderDetail.uuid) {
      this.setState({
        patientHeaderDetail: nextProps.patientHeaderDetail,
      });
    }
  }

  shouldRedirect() {
    this.setState({ redirect: true });
  }

  renderForm(selectedLabConcept) {
    const { patientHeaderDetail } = this.state;
    const {
      CONSTANTS, conceptMembers, didNotPerformCheckbox, history: { location: { state } },
    } = this.props;

    const encounterType = {
      uuid: CONSTANTS.labResultsEncounterType,
    };

    const hasMembers = selectedLabConcept.set;
    const hasAnswers = !!selectedLabConcept.answers.length;
    const isSingle = !hasMembers && !selectedLabConcept.set && !hasAnswers;
    let hasRanges = false;

    if (hasMembers && !R.isEmpty(conceptMembers)) {
      hasRanges = hasMaxAndMinValues(selectedLabConcept.setMembers, conceptMembers);
    } else if (!hasAnswers) {
      hasRanges = selectedLabConcept.hiNormal !== 'null' && selectedLabConcept.lowNormal !== 'null';
    }

    const maxDateRange = maxDateValue(new Date());
    const observations = (
      <Grid>
        {
          (hasMembers || hasAnswers || isSingle)
            && (
              <div className="col-xs-4">
                <span className="single-result-field">
                  <span className="obs-date-label">Result Date</span>
                  <span className="obs-date-field">
                    <Obs
                      datatype="date"
                      concept="68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0"
                      path="result-date"
                      validate={[maxDateRange]}
                    />
                  </span>
                </span>
              </div>
            )
        }
        <div className="col-xs-4">
          <div className="did-not-perform-checkbox">
            <Obs
              conceptAnswer={CONSTANTS.labResultsDidNotPerformAnswer}
              widget="checkbox"
              concept={CONSTANTS.labResultsDidNotPerformQuestion}
              path="did-not-perform-checkbox"
              checkBoxTitle="Did not perform"
            />
          </div>
        </div>
        {didNotPerformCheckbox && (
          <div className="col-xs-4">
            <div className="did-not-perform">
              <span className="did-not-perform-label">Reason:&nbsp;</span>
              <Obs
                conceptAnswers={["Low Volume",
                  "Contaminated",
                  "Equipment Failure",
                  "Stock Out",
                  "Blood Coagulation",
                  "Inappropriate Container"]}
                widget="dropdown"
                concept={CONSTANTS.fetchLabResultsDidNotPerformReason}
                path="did-not-perform-dropdown"
              />
            </div>
          </div>
        )}
        {
          (hasAnswers)
            && (
              <div className="col-xs-4">
                <span className="single-result-field">
                  <span className="obs-dropdown-label">{selectedLabConcept.display}</span>
                  <span className="obs-dropdown-field">
                    <Obs
                      conceptAnswers={selectedLabConcept.answers}
                      widget="dropdown"
                      concept={selectedLabConcept.uuid}
                      path={selectedLabConcept.uuid}
                    />
                  </span>
                </span>
              </div>
            )
        }
        <Row>
          {(hasMembers)
            && (
              selectedLabConcept.setMembers.map(
                member => this.renderFormContent(member),
              ))
          }
          {(isSingle)
          && (this.renderFormContent(selectedLabConcept))
          }
        </Row>
      </Grid>
    );

    return (
      <div className="fieldset-container lab-entry-result-details">
        <div className="legend">
          <span> Result Details </span>
        </div>
        <div className="fieldset-body">
          {hasRanges
            && (<span className="range-header-text">NORMAL RANGE</span>)
          }
          <span className="encounter-form-componnent">
            <EncounterFormPage
              defaultValues={[
                {
                  type: "obs",
                  path: "test-order-number",
                  concept: "393dec41-2fb5-428f-acfa-36ea85da6666",
                  value: state.orderNumber,
                },
              ]}
              afterSubmitLink="/"
              backLink="/"
              encounterType={encounterType}
              formContent={observations}
              patient={patientHeaderDetail}
              formId="result-entry-form"
            />
          </span>
        </div>
      </div>
    );
  }

  renderFormContent(member) {
    const { conceptMembers } = this.props;
    const memberDetails = conceptMembers[member.uuid] || member;
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
        <span className="member-display-label">
          {member.display}
        </span>
        <span className="obs-component">
          <Obs
            {...obsProps}
          />
        </span>
        <span className="units">{units || ''}</span>
        <span className="valid-range">
          {normalRange}
        </span>
      </FormGroup>
    );
  }

  render() {
    const { patientHeaderDetail, redirect } = this.state;
    const {
      location, selectedLabConcept,
    } = this.props;

    if (!location.state || redirect) {
      return <Redirect to="/" />;
    }
    if (!R.isEmpty(selectedLabConcept)) {
      return (
        <div className="container-fluid">
          {patientHeaderDetail && <PatientHeader patient={patientHeaderDetail} />}
          {location.state
          && (
            <div>
              <h2 className="lab-entry-page-title">Test Results</h2>
              <div className="fieldset-container">
                <div className="legend">
                  <span> Specimen Details </span>
                </div>
                <div className="fieldset-body">
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
                    <span className="test-details-label">
                  Test:&nbsp;
                      <span className="test-details">{location.state.display}</span>
                    </span>
                  </div>
                  <div className="col-xs-6">
                    <span className="test-details-label">
                  Urgency:&nbsp;
                      <span className="test-details">{location.state.urgency}</span>
                    </span>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          )}
          <br />
          <br />
          <div>
            {this.renderForm(selectedLabConcept)}
          </div>
        </div>
      );
    }

    return (
      <Loader />
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
  CONSTANTS: PropTypes.object.isRequired,
  conceptMembers: PropTypes.object.isRequired,
  didNotPerformCheckbox: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    patient: { patient },
    selectedLabConcept,
    openmrs: { CONSTANTS },
    conceptMembers,
  } = state;
  const selector = formValueSelector('result-entry-form');
  const didNotPerformCheckbox = CONSTANTS && !!(selector(state, `obs|path=did-not-perform-checkbox|concept=${CONSTANTS.labResultsDidNotPerformQuestion}`));

  return {
    patientHeaderDetail: patient,
    selectedLabConcept,
    CONSTANTS,
    conceptMembers,
    didNotPerformCheckbox,
  };
};

export default connect(mapStateToProps)(LabResultEntry);
