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
import { FormattedMessage } from 'react-intl';
import { SortableTable, Loader, constantsActions } from '@openmrs/react-components';
import LabOrderListFilters from './LabOrdersListFilters';
import { fetchLabOrders } from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';
import { filterThrough, calculateTableRows } from '../utils/helpers';
import filtersAction from '../actions/filtersAction';
import patientAction from '../actions/patientAction';
import "../../css/lab-orders-list.scss";


export const Cell = ({ columnName, value, dateAndTimeFormat }) => {
  switch (columnName) {
    case 'EMR ID': {
      // TODO: refactor this and name column to use React Components patientUtils
      const emrID = value.patient.display.split('-')[0];
      return (
        <div className="table_cell emr-id">
          <span>{emrID}</span>
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


export class LabOrdersList extends PureComponent {
  constructor() {
    super();

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearNameEMRField = this.clearNameEMRField.bind(this);
    this.handleShowResultsEntryPage = this.handleShowResultsEntryPage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(constantsActions.getDateAndTimeFormat());
    dispatch(constantsActions.fetchLabResultsEncounterType());
    dispatch(constantsActions.fetchLabResultsDidNotPerformQuestion());
    dispatch(constantsActions.fetchLabResultsTestOrderType());
    dispatch(constantsActions.fetchLabResultsDidNotPerformAnswer());
    dispatch(constantsActions.fetchLabResultsTestOrderNumberConcept());
    dispatch(constantsActions.fetchLabResultsTestLocationQuestion());
    dispatch(constantsActions.fetchLabResultsEstimatedCollectionDateQuestion());
    dispatch(constantsActions.fetchLabResultsEstimatedCollectionDateAnswer());
    dispatch(constantsActions.fetchLabResultsDidNotPerformReasonQuestion());
    dispatch(constantsActions.fetchLabResultsDateConcept());
    dispatch(patientAction.setSelectedPatient(''));
    dispatch(setSelectedConcept(''));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, labResultsTestOrderType } = this.props;
    if (nextProps.labResultsTestOrderType !== labResultsTestOrderType) {
      dispatch(fetchLabOrders(nextProps.labResultsTestOrderType));
    }
  }

  handleShowResultsEntryPage(order) {
    const { history } = this.props;
    history.push({
      pathname: "/LabResultEntry",
      state: order,
    });
  }

  clearNameEMRField() {
    const { dispatch, labOrdersListFilters } = this.props;
    const newFilters = {
      ...labOrdersListFilters,
      nameField: "",
    };
    dispatch(filtersAction.setLabOrdersListFilters(newFilters));
  }

  handleFilterChange(field, value) {
    const { dispatch, labOrdersListFilters } = this.props;
    const newFilters = {
      ...labOrdersListFilters,
      [field]: value,
    };
    dispatch(filtersAction.setLabOrdersListFilters(newFilters));
  }

  renderDraftOrderTable() {
    const { orders, dateAndTimeFormat, labOrdersListFilters } = this.props;
    const fields = ["EMR ID", "NAME", "ORDER ID", "ORDER DATE", "URGENCY", "TEST TYPE"];

    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    <FormattedMessage
      id={`app.labOrdersList.${columnName.replace(" ", "_")}`}
      defaultMessage={`${columnName}`}
      description={`LabOrderList table header for ${columnName}`} />
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} dateAndTimeFormat={dateAndTimeFormat} />,
      className: `lab-order-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-order-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    return (
      <div className="lab-order-list">
        <SortableTable
          data={orders}
          filters={labOrdersListFilters}
          getDataWithFilters={filterThrough}
          columnMetadata={columnMetadata}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
          onPageChange={page => this.handleFilterChange('page', page)}
          onPageSizeChange={pageSize => this.handleFilterChange('pageSize', pageSize)}
          rowOnClick={this.handleShowResultsEntryPage}
          noDataMessage="No orders found"
          minRows={0}
          page={labOrdersListFilters.page}
          defaultPageSize={labOrdersListFilters.pageSize || calculateTableRows(orders.length)}
        />
      </div>
    );
  }

  render() {
    const {
      labTests, orders, labOrdersListFilters: {
        dateFromField, dateToField, nameField, testTypeField,
      },
    } = this.props;
    if (!R.isEmpty(orders) && !R.isEmpty(labTests)) {
      return (
        <div className="main-container">
          <h2>
            <FormattedMessage
              id="app.labOrdersList.title"
              defaultMessage="Lab Test Results"
              description="Welcome header on LabTestResult page" />
          </h2>

          <React.Fragment>
            <LabOrderListFilters
              handleFieldChange={this.handleFilterChange}
              clearNameEMRField={this.clearNameEMRField}
              labTests={labTests}
              testTypeField={testTypeField}
              dateFromField={moment(dateFromField)}
              dateToField={moment(dateToField)}
              nameField={nameField}
            />
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

LabOrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  labTests: PropTypes.array.isRequired,
  dateAndTimeFormat: PropTypes.string.isRequired,
};

export const mapStateToProps = ({
  labOrders: { orders, labTests },
  openmrs: { CONSTANTS: { dateAndTimeFormat, labResultsTestOrderType } },
  filters: { labOrdersListFilters },
}) => ({
  orders,
  labTests,
  dateAndTimeFormat,
  labResultsTestOrderType,
  labOrdersListFilters,
});

const LabOrdersListContainer = (
  propsFromState,
  Component,
) => withRouter(connect(propsFromState)(Component));

export default LabOrdersListContainer(mapStateToProps, LabOrdersList);
