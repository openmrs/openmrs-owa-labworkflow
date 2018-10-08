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
  console.log('vals', value.obs.length);
  const obsWithoutTestOrderNumber = value.obs.filter(item => item.concept.display !== "Test order number");
  const isPanel = value.obs.length > 2;
  console.log('isPanel', obsWithoutTestOrderNumber);
  switch (columnName) {
    case 'TYPE': {
      // TODO: refactor this and name column to use React Components patientUtils
      const emrID = value.patient.display.split('-')[0];
      return (
        <div className="table_cell emr-id">
          <span>{obsWithoutTestOrderNumber.concept.display}</span>
        </div>
      );
    }
    case 'NAME': {
      const displayName = value.patient.display.split('-')[1];
      return (
        <div className="table_cell order-date">
          <span>{displayName}</span>
        </div>
      );
    }
    case 'ORDER ID':
      return (
        <div className="table_cell order-id">
          <span>{value.orderNumber}</span>
        </div>
      );
    case 'ORDER DATE':
      return (
        <div className="table_cell order-date">
          <span>{moment(value.dateActivated).format("DD-MMM-YYYY")}</span>
        </div>
      );
    case 'COLLECTION DATE':
      return (
        <div className="table_cell collection-date">
          <span>{moment(value.dateActivated).format("DD-MMM-YYYY")}</span>
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
    };
    // this.handleFilterChange = this.handleFilterChange.bind(this);
    // this.clearNameEMRField = this.clearNameEMRField.bind(this);
    // this.handleShowResultsEntryPage = this.handleShowResultsEntryPage.bind(this);
  }


  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(patientAction.getPatient('49287a9d-256b-4f52-9a92-ec61f9166f25'));
    dispatch(patientAction.fetchPatientLabTestResults('49287a9d-256b-4f52-9a92-ec61f9166f25'));
  }

  renderDraftOrderTable() {
    const { obs, dateAndTimeFormat } = this.props;
    console.log('obs', obs);
    // const { filters } = this.state;
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
          data={obs}
          columnMetadata={columnMetadata}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
          rowOnClick={this.handleShowResultsEntryPage}
          noDataMessage="No orders found"
          defaultPageSize={10}
        />
      </div>
    );
  }

  render() {
    const { obs } = this.props;
    const { filters: { dateFromField, dateToField, nameField } } = this.state;
    if (!R.isEmpty(obs)) {
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
            {this.renderDraftOrderTable()}
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
  encounter: { obs },
  openmrs: { CONSTANTS: { dateAndTimeFormat } },
}) => ({
  obs,
});


export default connect(mapStateToProps)(LabResultsView);
