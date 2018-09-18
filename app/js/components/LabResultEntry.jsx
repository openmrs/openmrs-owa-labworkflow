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

import {
  Grid,
  Row,
  FormGroup,
  ControlLabel,
  Col,
  Button,
} from 'react-bootstrap';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';

import {
  CustomDatePicker,
  PatientHeader,
  EncounterFormPage,
  Obs,
  Submit,
} from '@openmrs/react-components';

import patientAction from '../actions/patientAction';
import labConceptsAction from '../actions/labConceptsAction';
import constantsAction from '../actions/constantsAction';
import '../../css/lab-result-entry.scss';


export class LabResultEntry extends PureComponent {
  state = {
    patientHeaderDetail: false,
    selectedLabConcept: null,
    redirect: false,
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

  renderFormContent = member => (
    <FormGroup controlId={member.display}>
      <Col componentClass={ControlLabel} sm={3}>
        {member.display}
      </Col>
      <Col sm={4}>
        <Obs
          concept={member.uuid}
          path={member.uuid}
        />
      </Col>
    </FormGroup>
  );


  renderForm = () => {
    const { selectedLabConcept, patientHeaderDetail } = this.state;
    const { CONSTANTS } = this.props;

    let observations;

    if (!selectedLabConcept) {
      observations = (<span />);
    } else {
      observations = (
        <Grid>
          <Row>
            {
              selectedLabConcept.setMembers.map(
                member => this.renderFormContent(member),
              )
            }
          </Row>
        </Grid>
      );
    }

    return (
      <fieldset>
        <legend>Result Details:</legend>
        <div>
          <EncounterFormPage
            afterSubmitLink="/"
            backLink="/"
            encounterType={CONSTANTS.labResultsEncounterType}
            formContent={observations}
            patient={patientHeaderDetail}
          />
        </div>
      </fieldset>
    );
  }

  shouldRedirect() {
    this.setState({ redirect: true });
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
};

const mapStateToProps = ({
  patient: { patient },
  selectedLabConcept,
  CONSTANTS,
}) => ({
  patientHeaderDetail: patient,
  selectedLabConcept,
  CONSTANTS,
});

export default connect(mapStateToProps)(LabResultEntry);
