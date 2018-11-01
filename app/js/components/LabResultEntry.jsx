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
import { formValueSelector, change } from 'redux-form';

import {
  Grid,
  Row,
  FormGroup,
} from 'react-bootstrap';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import {
  EncounterDate,
  EncounterFormPage,
  Obs,
  ObsGroup,
  formValidations,
  constantsActions,
  Loader,
  formUtil,
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
  criticalMaxValue,
  criticalMinValue,
  maxDateValue,
} = formValidations;

export class LabResultEntry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    const { dispatch, history: { location: { state } }, CONSTANTS } = this.props;
    if (typeof state !== 'undefined') {
      const conceptUUID = state.concept.uuid;
      const patientUUID = state.patient.uuid;
      dispatch(patientAction.getPatient(patientUUID));
      dispatch(constantsActions.fetchLabResultsDidNotPerformReasonAnswer(CONSTANTS.labResultsDidNotPerformReasonQuestion));
      dispatch(constantsActions.fetchLabResultsTestLocationAnswer(CONSTANTS.labResultsTestLocationQuestion));
      dispatch(patientAction.fetchPatientLabTestResults(state.patient.uuid));
      dispatch(fetchLabConcept(conceptUUID));
    } else {
      this.shouldRedirect();
    }
  }

  getEncounter() {
    const {
      CONSTANTS, selectedPatient, patients, history: { location: { state } },
    } = this.props;

    const patient = patients[selectedPatient] || {};

    const { encounters = [] } = patient;

    const matchedEncounter = encounters.filter((encounter) => {
      const testOrderObs = encounter.obs.filter(
        item => item.concept.uuid === CONSTANTS.labResultsTestOrderNumberConcept,
      );
      const testOrderNumber = testOrderObs[0].value;
      const matched = testOrderNumber === state.orderNumber;
      return matched;
    });
    return matchedEncounter[0];
  }

  shouldRedirect() {
    this.setState({ redirect: true });
  }

  renderForm(selectedLabConcept) {
    const {
      CONSTANTS, conceptMembers, selectedPatient, patients, history: { location: { state } },
      isDidNotPerformCheckboxSelected, dispatch, formId,
    } = this.props;
    if (!(isDidNotPerformCheckboxSelected)) {
      const obsFieldName = formUtil.obsFieldName('did-not-perform-dropdown', CONSTANTS.labResultsDidNotPerformReasonQuestion);
      dispatch(change(formId, obsFieldName, ''));
    }

    const patient = patients[selectedPatient] || {};


    const encounter = this.getEncounter();
    const hasEncounter = !R.isEmpty(encounter);

    const encounterType = {
      uuid: CONSTANTS.labResultsEncounterType,
    };

    const encounterFormPageDefaultValues = [
      {
        type: "obs",
        path: "test-order-number",
        concept: CONSTANTS.labResultsTestOrderNumberConcept,
        value: state.orderNumber,
      },
    ];

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
        <div className="observation">
          {
            (hasMembers || hasAnswers || isSingle)
            && (
              <div className="col-xs-4">
                <span className="single-result-field">
                  <span className="obs-date-label">Result Date:</span>
                  <span className="obs-date-field">
                    <Obs
                      datatype="date"
                      concept={CONSTANTS.labResultsDateConcept}
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
          <div className="col-xs-4">
            <div className="did-not-perform">
              <span className="did-not-perform-label">Reason:&nbsp;</span>
              <Obs
                conceptAnswers={CONSTANTS.labResultsDidNotPerformReasonAnswer}
                widget="dropdown"
                disabled={!(isDidNotPerformCheckboxSelected)}
                concept={CONSTANTS.labResultsDidNotPerformReasonQuestion}
                path="did-not-perform-dropdown"
                dropDownStyle={{ heigth: '40px', width: '100%' }}
              />
            </div>
          </div>
          {
            (hasAnswers)
            && (
              <div className="col-xs-4 observation-dropdown">
                <span className="single-result-field">
                  <span className="obs-dropdown-label">
                    {`${selectedLabConcept.display}: `}
                      &nbsp;
                  </span>
                  <span className="obs-dropdown-field">
                    <Obs
                      conceptAnswers={selectedLabConcept.answers}
                      widget="dropdown"
                      concept={selectedLabConcept.uuid}
                      path={selectedLabConcept.uuid}
                      dropDownStyle={{ heigth: '40px', width: '100%' }}
                    />
                  </span>
                </span>
              </div>
            )
          }
          <div className="specimen-detail">
            <div className="estimated-checkbox">
              <Obs
                conceptAnswer={CONSTANTS.labResultsEstimatedCollectionDateAnswer}
                widget="checkbox"
                concept={CONSTANTS.labResultsEstimatedCollectionDateQuestion}
                path="estimated-checkbox"
                checkBoxTitle="estimated"
              />
            </div>
            <div className="test-location">
              <span className="test-location-label">Test location:&nbsp;</span>
              <Obs
                conceptAnswers={CONSTANTS.labResultsTestLocationAnswer}
                widget="dropdown"
                concept={CONSTANTS.labResultsTestLocationQuestion}
                path="test-location-dropdown"
                dropDownStyle={{ heigth: '40px', width: '100%' }}
              />
            </div>
            <div className="specimen-collection-date">
              <div className="col-xs-10 encounter-date-container">
                <span className="encounter-date-label">Specimen Collection Date: &nbsp;</span>
                <EncounterDate
                  handleDateChange={() => {}}
                  labelClassName="date-picker-label"
                  label="Specimen Collection Date:"
                  defaultDate={moment().startOf('day')}
                  field="dateFromField"
                />
              </div>
              <br />
            </div>
          </div>
          <Row>
            {(hasMembers)
            && (
              <ObsGroup groupingConcept={selectedLabConcept.uuid} path={selectedLabConcept.uuid}>
                {selectedLabConcept.setMembers.map(
                  member => this.renderFormContent(member),
                )}
              </ObsGroup>)
            }
            {(isSingle)
          && (this.renderFormContent(selectedLabConcept))
            }
          </Row>
        </div>
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
            {hasEncounter
              ? (
                <EncounterFormPage
                  encounter={encounter}
                  defaultValues={encounterFormPageDefaultValues}
                  backLink="/"
                  afterSubmitLink="/"
                  encounterType={encounterType}
                  formContent={observations}
                  patient={patient}
                  formId="result-entry-form"
                />
              )
              : (
                <EncounterFormPage
                  defaultValues={encounterFormPageDefaultValues}
                  backLink="/"
                  encounterType={encounterType}
                  formContent={observations}
                  patient={patient}
                  formId="result-entry-form"
                />
              )
            }
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
      const criticalMaxRange = criticalMaxValue(hiCritical);
      warnings.push(criticalMaxRange);
    }

    if (lowCritical) {
      const criticalMinRange = criticalMinValue(lowCritical);
      warnings.push(criticalMinRange);
    }

    if (hiNormal) {
      const abnormalMaxRange = abnormalMaxValue(hiNormal);
      warnings.push(abnormalMaxRange);
    }

    if (lowNormal) {
      const abnormalMinRange = abnormalMinValue(lowNormal);
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

    const normalRange = formatRangeDisplayText(lowNormal, hiNormal);
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
    const { redirect } = this.state;
    const {
      location, selectedLabConcept,
    } = this.props;


    if (!location.state || redirect) {
      return <Redirect to="/" />;
    }
    if (!R.isEmpty(selectedLabConcept)) {
      return (
        <div className="container-fluid">
          {location.state
          && (
            <div>
              <h2 className="lab-entry-page-title">
                Test Results -
                {` ${location.state.display}`}
              </h2>
              <div className="lab-result-detail-fieldset-container">
                <div className="fieldset-container lab-result-detail-fieldset">
                  <div className="legend">
                    <span className="lab-result-detail-fieldset-title"> Specimen Details </span>
                  </div>
                </div>
                <div className="fieldset-container lab-result-detail-fieldset">
                  <div className="legend">
                    <span className="lab-result-detail-fieldset-title"> Order Details </span>
                  </div>
                  <div className="fieldset-body">
                    <div className="col-xs-7">
                      <span className="test-details-label">
                  Order Number:&nbsp;
                        <span className="test-details">{location.state.orderNumber}</span>
                      </span>
                    </div>
                    <div className="col-xs-5">
                      <span className="test-details-label">
                  Urgency:&nbsp;
                        <span className="test-details">{location.state.urgency}</span>
                      </span>
                    </div>
                    <div className="col-xs-7 order-date-detail">
                      <span className="test-details-label">
                  Order Date:&nbsp;
                        <span className="test-details">{moment(location.state.concept.dateActivated).format('MMM DD h:mm A')}</span>
                      </span>
                    </div>
                    <br />
                    <br />
                  </div>
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
  patients: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  testLocationConcept: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedLabConcept: PropTypes.object,
  location: PropTypes.object.isRequired,
  CONSTANTS: PropTypes.object.isRequired,
  conceptMembers: PropTypes.object.isRequired,
  selectedPatient: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    selectedLabConcept,
    openmrs: { CONSTANTS },
    conceptMembers,
    patients,
    selectedPatient,
    form,
  } = state;
  const formId = Object.keys(form)[0];
  let isDidNotPerformCheckboxSelected = true;
  if (formId) {
    const selector = formValueSelector(formId);
    const obsFieldName = formUtil.obsFieldName('did-not-perform-checkbox', CONSTANTS.labResultsDidNotPerformQuestion);
    isDidNotPerformCheckboxSelected = !!(selector(state, obsFieldName));
  }
  return {
    patients,
    selectedPatient,
    selectedLabConcept,
    CONSTANTS,
    conceptMembers,
    isDidNotPerformCheckboxSelected,
    formId,
  };
};

export default connect(mapStateToProps)(LabResultEntry);
