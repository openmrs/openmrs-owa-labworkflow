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
import { formValueSelector, change, untouch } from 'redux-form';
import {
  Grid,
  Row,
  FormGroup,
} from 'react-bootstrap';
import moment from 'moment';
import cn from 'classnames';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { startOfToday } from 'date-fns';

import {
  EncounterDate,
  EncounterFormPanel,
  Obs,
  ObsGroup,
  formValidations,
  Loader,
  formUtil,
} from '@openmrs/react-components';
import patientAction from '../actions/patientAction';
import { fetchLabConcept } from '../actions/labConceptsAction';
import { clearFormValues, reloadForm } from '../actions/formActions';
import constantsActions from '../actions/constantsAction';
import { updateLabOrderWithEncounter, saveFulfillerStatus } from '../actions/labOrdersAction';
import '../../css/lab-result-entry.scss';
import { formatRangeDisplayText, hasMaxAndMinValues, getConceptShortName } from '../utils/helpers';
import { selectProperty, selectLocale } from '../utils/globalProperty';

const {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  criticalMaxValue,
  criticalMinValue,
  maxDateValue,
  minDateValue,
} = formValidations;

export class LabResultEntry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      labOrder: {},
      encounter: {},
      isReady: false,
    };
  }

  componentWillMount() {
    const {
      dispatch,
      history: { location: { state } },
      labResultsDidNotPerformReasonQuestion,
      labResultsTestLocationQuestion,
    } = this.props;
    if (typeof state !== 'undefined') {
      const conceptUUID = state.concept.uuid;
      const patientUUID = state.patient.uuid;
      this.setState({ labOrder: state });
      dispatch(updateLabOrderWithEncounter(state));
      dispatch(patientAction.getPatient(patientUUID));
      dispatch(constantsActions.fetchConceptAsConstant(labResultsDidNotPerformReasonQuestion, 'labResultsDidNotPerformReasonAnswer'));
      dispatch(constantsActions.fetchConceptAsConstant(labResultsTestLocationQuestion, 'labResultsTestLocationAnswer'));
      dispatch(fetchLabConcept(conceptUUID));
    } else {
      this.shouldRedirect();
    }
  }

  componentDidUpdate(prevProps) {
    const { isDidNotPerformCheckboxSelected, hasCache } = this.props;
    if (isDidNotPerformCheckboxSelected) {
      this.clearObsFields();
    }
    if (!isDidNotPerformCheckboxSelected && hasCache) {
      this.reloadCachedValues();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const { labOrder } = this.state;
    if (!R.isEmpty(labOrder)) {
      dispatch(updateLabOrderWithEncounter(labOrder));
    }
  }

  updateEncounterAndIsReady() {
    // this is a bit hacky... previously, we loaded in all the encounters on the LabOrdersList page,
    // and so had the encounter information immediately available on the labOrder object passed in
    // (see handleShowResultsEntryPage in LabOrdersList)
    // now we don't add the encounter to the order until this page is mounted, so we have to pull
    // the order off the "orders" object in the state
    // (we separate out the encounter from "isReady" to avoid a flicker between the "enter" and "view" pages
    // TODO find a better design for this
    const { orders } = this.props;
    const { labOrder } = this.state;
    const matchingOrder = orders.find(order => order.uuid === labOrder.uuid);

    if (matchingOrder && matchingOrder.labResult) {
      this.setState({
        encounter: matchingOrder.labResult.encounter,
        isReady: true,
      });
    }
  }

  clearObsFields() {
    const { dispatch, formId, selectedLabConcept } = this.props;
    dispatch(clearFormValues(selectedLabConcept, formId, dispatch));
  }

  reloadCachedValues() {
    const { dispatch } = this.props;
    dispatch(reloadForm(dispatch));
  }

  shouldRedirect() {
    this.setState({ redirect: true });
  }

  renderForm(selectedLabConcept) {
    const {
      labResultsDidNotPerformReasonQuestion,
      labResultsTestOrderNumberConcept,
      labResultsDateConcept,
      labResultsDidNotPerformAnswer,
      labResultsDidNotPerformQuestion,
      labResultsDidNotPerformReasonAnswer,
      labResultsEstimatedCollectionDateAnswer,
      labResultsEstimatedCollectionDateQuestion,
      labResultsTestLocationAnswer,
      labResultsTestLocationQuestion,
      conceptMembers,
      selectedPatient,
      patients,
      history: { location: { state } },
      isDidNotPerformCheckboxSelected,
      dispatch,
      formId,
      labResultsEntryEncounterType,
      encounterDateOrToday = new Date(),
      locale,
    } = this.props;


    this.updateEncounterAndIsReady();
    const { encounter, isReady } = this.state;
    const hasEncounter = !R.isEmpty(encounter);

    if (!(isDidNotPerformCheckboxSelected)) {
      const obsFieldName = formUtil.obsFieldName('did-not-perform-dropdown', labResultsDidNotPerformReasonQuestion);
      dispatch(change(formId, obsFieldName, ''));
    }

    const patient = patients[selectedPatient] || {};
    const encounterType = {
      uuid: labResultsEntryEncounterType,
    };

    const selectedOrder = state;

    const encounterFormPageDefaultValues = [
      {
        type: "obs",
        path: "test-order-number",
        concept: labResultsTestOrderNumberConcept,
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

    const maxDateRange = maxDateValue(new Date(), "today's");
    const minDateRange = minDateValue(new Date(selectedOrder.dateActivated), 'the ordered');
    const collectionDateRange = minDateValue(new Date(encounterDateOrToday), 'the sample collection');

    const observations = (
      <Grid fluid={true}>
        <div className="observation">
          {
            (hasMembers || hasAnswers || isSingle)
            && (
              <div className="col-xs-4">
                <span className="single-result-field">
                  <span className="obs-date-label">
                    <FormattedMessage
                      id="app.labResultEntry.resultDatelabel"
                      defaultMessage="Result Date:" />
                  </span>
                  <span className="obs-date-field">
                    <Obs
                      datatype="date"
                      defaultDate={undefined}
                      concept={labResultsDateConcept}
                      path="result-date"
                      validate={[maxDateRange, minDateRange, collectionDateRange]}
                    />
                  </span>
                </span>
              </div>
            )
          }
          <div className="col-xs-4">
            <div className="did-not-perform-checkbox">
              <Obs
                conceptAnswer={labResultsDidNotPerformAnswer}
                widget="checkbox"
                concept={labResultsDidNotPerformQuestion}
                path="did-not-perform-checkbox"
                checkBoxTitle={(
                  <FormattedMessage
                    id="app.labResultEntry.didNotPerformlabel"
                    defaultMessage="Did not perform" />
                )}
              />
            </div>
          </div>
          <div className="col-xs-4">
            <div className="did-not-perform">
              <span className="did-not-perform-label">
                <FormattedMessage
                  id="app.labResultEntry.reasonlabel"
                  defaultMessage="Reason:" />
&nbsp;

              </span>
              <Obs
                conceptAnswers={labResultsDidNotPerformReasonAnswer ? labResultsDidNotPerformReasonAnswer : []}
                widget="dropdown"
                disabled={!(isDidNotPerformCheckboxSelected)}
                concept={labResultsDidNotPerformReasonQuestion}
                path="did-not-perform-dropdown"
                dropDownStyle={{ width: '100%' }}
                required={!!(isDidNotPerformCheckboxSelected)}
              />
            </div>
          </div>
          {
            (hasAnswers && !isDidNotPerformCheckboxSelected)
            && (
              <div className="col-xs-12 observation-dropdown">
                <span className="single-result-field">
                  <span className="obs-dropdown-label">
                    {`${getConceptShortName(selectedLabConcept, locale)}: `}
                      &nbsp;
                  </span>
                  <span className="obs-dropdown-field">
                    <Obs
                      conceptAnswers={selectedLabConcept.answers}
                      widget="dropdown"
                      concept={selectedLabConcept.uuid}
                      path={selectedLabConcept.uuid}
                      dropDownStyle={{ width: '100%' }}
                    />
                  </span>
                </span>
              </div>
            )
          }
          <div className="specimen-detail">
            <div className="estimated-checkbox">
              <Obs
                conceptAnswer={labResultsEstimatedCollectionDateAnswer}
                widget="checkbox"
                concept={labResultsEstimatedCollectionDateQuestion}
                path="estimated-checkbox"
                checkBoxTitle={(
                  <FormattedMessage
                    id="app.labResultEntry.estimatedlabel"
                    defaultMessage="estimated " />
                )}
              />
            </div>
            <div className="test-location">
              <span className="test-location-label">
                <FormattedMessage
                  id="app.labResultEntry.testLocationlabel"
                  defaultMessage="Test location: " />
&nbsp;
              </span>
              <Obs
                conceptAnswers={labResultsTestLocationAnswer}
                widget="dropdown"
                concept={labResultsTestLocationQuestion}
                path="test-location-dropdown"
                dropDownStyle={{ width: '100%' }}
              />
            </div>
            <div className="specimen-collection-date">
              <div className="col-xs-10 encounter-date-container">
                <span className="encounter-date-label">
                  <FormattedMessage
                    id="app.labResultEntry.specimenCollectionDatelabel"
                    defaultMessage="Specimen Collection Date: " />
&nbsp;
                </span>
                <span className="encounter-date-field">
                  <EncounterDate
                    id="specimen-collection-date"
                    handleDateChange={() => {}}
                    labelClassName="date-picker-label"
                    label="Specimen Collection Date:"
                    defaultDate={startOfToday()}
                    field="specimen"
                    validations={[minDateRange]}
                  />
                </span>
              </div>
              <br />
            </div>
          </div>
          {!isDidNotPerformCheckboxSelected
          && (
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
          )
          }
        </div>
      </Grid>
    );

    return (
      <div className="fieldset-container lab-entry-result-details">
        <div className="legend">
          <span>
            <FormattedMessage
              id="app.labResultEntry.resultDetails"
              defaultMessage="Result Details" />
          </span>
        </div>
        <div className="fieldset-body">
          {hasRanges
            && (<span className="range-header-text">
            <FormattedMessage
              id={`app.labOrdersList.NORMAL_RANGE`}
              defaultMessage={`NORMAL RANGE`} />
          </span>)
          }
          {isReady
            && (<span className="encounter-form-componnent">
                {hasEncounter
                  ? (
                    <EncounterFormPanel
                      encounter={encounter}
                      defaultValues={encounterFormPageDefaultValues}
                      backLink="/"
                      afterSubmitLink="/"
                      encounterType={encounterType}
                      formContent={observations}
                      formSubmittedActionCreators={[saveFulfillerStatus]}
                      patient={patient}
                      formId="result-entry-form"
                      orderForObs={selectedOrder}
                      timestampNewEncounterIfCurrentDay
                    />
                  )
                  : (
                    <EncounterFormPanel
                      defaultValues={encounterFormPageDefaultValues}
                      backLink="/"
                      encounterType={encounterType}
                      formContent={observations}
                      formSubmittedActionCreators={[saveFulfillerStatus]}
                      patient={patient}
                      formId="result-entry-form"
                      orderForObs={selectedOrder}
                      timestampNewEncounterIfCurrentDay
                    />
                  )
                }
            </span>)
          }
        </div>
      </div>
    );
  }

  renderFormContent(member) {
    const { conceptMembers, locale } = this.props;
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
    const memberHasAnswers = !!member.answers.length;

    return (
      <div>
          <FormGroup controlId={member.display} key={ member.uuid }>
            <span className="member-display-label">
              {getConceptShortName(member, locale)}
            </span>
            <span className="obs-component">
              { (memberHasAnswers) && (
                   <span className="obs-dropdown-field">
                        <Obs
                          conceptAnswers={member.answers}
                          widget="dropdown"
                          concept={member.uuid}
                          path={member.uuid}
                          dropDownStyle={{ width: '100%' }}
                        />
                      </span>
                )
              }
              { (!memberHasAnswers) && (
                  <Obs
                    {...obsProps}
                  />
                )
              }
            </span>
            <span className="units">{units || ''}</span>
            <span className="valid-range">
              {normalRange}
            </span>
          </FormGroup>

      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    const {
      location,
      selectedLabConcept,
      form,
      returnUrl,
      locale,
    } = this.props;

    if (!location.state || redirect) {
      return <Redirect to="/" />;
    }

    if (!R.isEmpty(selectedLabConcept)) {
      const urgencyClassName = cn({
        urgencyDetails: true,
        urgency: true,
        stat: location.state.urgency === 'STAT',
        routine: location.state.urgency === 'ROUTINE',
      });

      return (
        <div className="container-fluid">
          {location.state
          && (
            <div>
              <h2 className="lab-entry-page-title">
                <FormattedMessage
                  id="app.labResultEntry.title"
                  defaultMessage="Test Results -" />
                {` ${getConceptShortName(location.state.concept,locale)}`}
              </h2>
              <div className="lab-result-detail-fieldset-container">
                <div className="fieldset-container lab-result-detail-fieldset">
                  <div className="legend">
                    <span className="lab-result-detail-fieldset-title">
                      <FormattedMessage
                        id="app.labResultEntry.specimenDetails"
                        defaultMessage="Specimen Details" />
                    </span>
                  </div>
                </div>
                <div className="fieldset-container lab-result-detail-fieldset">
                  <div className="legend">
                    <span className="lab-result-detail-fieldset-title">
                      <FormattedMessage
                        id="app.labResultEntry.orderDetails"
                        defaultMessage="Order Details" />

                    </span>
                  </div>
                  <div className="fieldset-body">
                    <div className="col-xs-7">
                      <span className="test-details-label">
                        <FormattedMessage
                          id="app.labResultEntry.orderNumberlabel"
                          defaultMessage="Order Number:" />
&nbsp;
                        <span className="test-details">{location.state.orderNumber}</span>
                      </span>
                    </div>
                    <div className="col-xs-5">
                      <span className="test-details-label">
                        <FormattedMessage
                          id="app.labResultEntry.urgencylabel"
                          defaultMessage="Urgency" />
:&nbsp;
                        <span className={urgencyClassName}>{ location.state.urgency }</span>
                      </span>
                    </div>
                    <div className="col-xs-10 order-date-detail">
                      <span className="test-details-label">
                        <FormattedMessage
                          id="app.labResultEntry.orderDatelabel"
                          defaultMessage="Order Date:" />
&nbsp;
                        <span className="test-details">{moment(location.state.dateActivated).format('MMM DD h:mm A')}</span>
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
          {returnUrl && (
            <div>
              <br />
              <br />
              <button className="cancel" type="button" onClick={() => window.location.assign(returnUrl)}>Return</button>
            </div>
          )}
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
  dispatch: PropTypes.func.isRequired,
  selectedLabConcept: PropTypes.object,
  location: PropTypes.object.isRequired,
  conceptMembers: PropTypes.object.isRequired,
  selectedPatient: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = (state) => {
  const {
    selectedLabConcept,
    CONSTANTS: {
      labResultsDidNotPerformReasonAnswer,
      labResultsTestLocationAnswer,
    },
    conceptMembers,
    patients,
    selectedPatient,
    form,
    currentForm,
  } = state;
  const formId = Object.keys(form)[0];
  const labResultsDidNotPerformQuestion = selectProperty(state, 'labResultsDidNotPerformQuestion');
  let isDidNotPerformCheckboxSelected = false;
  let encounterDateOrToday;
  let hasCache = false;

  if (currentForm.formId === formId) {
    hasCache = true;
  }

  if (formId) {
    const selector = formValueSelector(formId);
    const obsFieldName = formUtil.obsFieldName('did-not-perform-checkbox', labResultsDidNotPerformQuestion);
    isDidNotPerformCheckboxSelected = !!(selector(state, obsFieldName));
    encounterDateOrToday = selector(state, 'encounter-datetime') || encounterDateOrToday;
  }

  const labResultsEntryEncounterType = selectProperty(state, 'labResultsEntryEncounterType');

  return {
    patients,
    selectedPatient,
    selectedLabConcept,
    conceptMembers,
    isDidNotPerformCheckboxSelected,
    formId,
    labResultsEntryEncounterType,
    labResultsDidNotPerformQuestion,
    labResultsDidNotPerformReasonQuestion: selectProperty(state, 'labResultsDidNotPerformReasonQuestion'),
    labResultsTestLocationQuestion: selectProperty(state, 'labResultsTestLocationQuestion'),
    labResultsTestOrderNumberConcept: selectProperty(state, 'labResultsTestOrderNumberConcept'),
    labResultsDateConcept: selectProperty(state, 'labResultsDateConcept'),
    labResultsDidNotPerformReasonAnswer,
    labResultsTestLocationAnswer,
    labResultsEstimatedCollectionDateAnswer: selectProperty(state, 'labResultsEstimatedCollectionDateAnswer'),
    labResultsEstimatedCollectionDateQuestion: selectProperty(state, 'labResultsEstimatedCollectionDateQuestion'),
    labResultsDidNotPerformAnswer: selectProperty(state, 'labResultsDidNotPerformAnswer'),
    encounterDateOrToday,
    hasCache,
    locale: selectLocale(state),
    orders: state.labOrders && state.labOrders.orders ? state.labOrders.orders : []
  };
};

export default connect(mapStateToProps)(LabResultEntry);
