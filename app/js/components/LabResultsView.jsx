/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { SortableTable, Loader, constantsActions } from '@openmrs/react-components';
import patientAction from '../actions/patientAction';
import { filterThrough } from '../utils/helpers';
import "../../css/lab-orders-list.scss";


export const Cell = ({ columnName, value, dateAndTimeFormat }) => {
  const isPanel = value.obs.length > 1;
  if (!isPanel) {
    const labResult = value.obs[0];
    switch (columnName) {
      case 'TYPE': {
        // TODO: refactor this and name column to use React Components patientUtils
        return (
          <div className="table_cell emr-id">
            <span>{value.order.display}</span>
          </div>
        );
      }
      case 'STATUS': {
        return (
          <div className="table_cell order-date">
            <span>{labResult.status}</span>
          </div>
        );
      }
      case 'REQUEST DATE':
        return (
          <div className="table_cell order-id">
            <span>{moment(value.encouterDatetime).format("DD-MMM-YYYY")}</span>
          </div>
        );
      case 'SAMPLE DATE':
        return (
          <div className="table_cell order-date">
            <span>{moment(value.encouterDatetime).format("DD-MMM-YYYY")}</span>
          </div>
        );
      case 'RESULT':
        return (
          <div className="table_cell collection-date">
            <span>{labResult.value.display}</span>
          </div>
        );
      case 'URGENCY': {
        const urgencyClassName = cn({
          table_cell: true,
          urgency: true,
          stat: value.urgency === 'STAT',
          routine: value.urgency === 'ROUTINE',
        });
        return (
          <div className={urgencyClassName}>
            <span>{value.urgency}</span>
          </div>
        );
      }
      case 'TEST TYPE':
        return (
          <div className="table_cell test-type">
            <span>{value.concept.display}</span>
          </div>
        );
      default:
        return null;
    }
  }
  if (isPanel && columnName === 'TYPE') {
    return (
      <div className="table_cell emr-id">
        <span>{value.order.display}</span>
      </div>
    );
  }
  return null;
};


export class LabResultsView extends PureComponent {
  constructor() {
    super();
    this.state = {
      filters: {
        nameField: "",
        dateToField: moment(),
        dateFromField: moment().subtract(8, 'days'),
        testTypeField: "All",
      },
      // would need to get this from the route
      patientUUID: '49287a9d-256b-4f52-9a92-ec61f9166f25',
    };
    // this.handleFilterChange = this.handleFilterChange.bind(this);
    // this.clearNameEMRField = this.clearNameEMRField.bind(this);
    // this.handleShowResultsEntryPage = this.handleShowResultsEntryPage.bind(this);
  }


  componentWillMount() {
    const { dispatch } = this.props;
    const { patientUUID } = this.state;
    dispatch(patientAction.getPatient(patientUUID));
    dispatch(patientAction.fetchPatientLabTestResults(patientUUID));
  }

  renderDraftOrderTable(labResults) {
    const { obs, dateAndTimeFormat, conceptMembers } = this.props;
    const fields = ["TYPE", "STATUS", "REQUEST DATE", "SAMPLE DATE", "RESULT", "NORMAL RANGE"];

    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    {columnName}
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} dateAndTimeFormat={dateAndTimeFormat} />,
      className: `lab-order-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-order-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    return (
      <div className="lab-order-list">
        <SortableTable
          data={labResults}
          columnMetadata={columnMetadata}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
          rowOnClick={this.handleShowResultsEntryPage}
          noDataMessage="No orders found"
          defaultPageSize={10}
          subComponent={(row) => {
            const isPanel = row.original.obs.length > 1;
            if (isPanel) {
              return (
                <span style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-around' }}>
                  <span>Rowland</span>
                  <span>Henshaw</span>
                  <span>Something</span>
                </span>
              );
            }
          }}
        />
      </div>
    );
  }

  render() {
    const { patients, conceptMembers } = this.props;
    const { patientUUID } = this.state;
    const selectedPatient = patients[patientUUID] || {};
    const { encounters = [], orders = [] } = selectedPatient;
    const getPatientLabResults = (patient) => {
      const labResults = encounters.map((encounter) => {
        const testOrderObs = encounter.obs.filter(item => item.display.includes('Test order number:'));
        const orderNumber = testOrderObs[0].value;
        const order = patient.orders.filter(item => item.orderNumber === orderNumber)[0];
        const validObs = encounter.obs.filter(item => !item.display.includes('Test order number:'));
        return { ...encounter, obs: validObs, order };
      });
      return labResults;
    };

    const { filters: { dateFromField, dateToField, nameField } } = this.state;
    if (!R.isEmpty(selectedPatient) && !R.isEmpty(orders) && !R.isEmpty(encounters) && !R.isEmpty(conceptMembers)) {
      const labResults = getPatientLabResults(patients[patientUUID]);
      return (
        <div className="main-container">
          <h2>
            Lab Test Results
          </h2>

          <React.Fragment>
            {/* <LabOrderListFilters
              handleFieldChange={this.handleFilterChange}
              clearNameEMRField={this.clearNameEMRField}
              labTests={labTests}
              dateFromField={dateFromField}
              dateToField={dateToField}
              nameField={nameField}
            /> */}
            {this.renderDraftOrderTable(labResults)}
          </React.Fragment>
        </div>
      );
    }
    return (
      <Loader />
    );
  }
}

LabResultsView.propTypes = {
  obs: PropTypes.array.isRequired,
  labTests: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dateAndTimeFormat: PropTypes.string.isRequired,
};

export const mapStateToProps = ({
  openmrs: { CONSTANTS: { dateAndTimeFormat } },
  patients,
  conceptMembers,
}) => ({
  patients,
  conceptMembers,
});


export default connect(mapStateToProps)(LabResultsView);
