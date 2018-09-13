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
import cn from 'classnames';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import { FormattedMessage } from 'react-intl';
import { SortableTable } from '@openmrs/react-components';
import LabOrderListFilters from './LabOrdersListFilters';

import { fetchLabOrders } from '../actions/labOrdersAction';
import { DEFAULT_DATE_FORMAT } from '../utils/constants';
import { getDateRange } from '../utils/helpers';
import "../../css/lab-orders-list.scss";


const Cell = ({ columnName, value }) => {
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
          <span>{moment(value.dateActivated).format(DEFAULT_DATE_FORMAT)}</span>
        </div>
      );
    case 'COLLECTION DATE':
      return (
        <div className="table_cell collection-date">
          <span>{moment(value.dateActivated).format("D-MMM-YYYY")}</span>
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
    this.state = {
      filters: {
        nameField: "",
        dateToField: moment(),
        dateFromField: moment().subtract(8, 'days'),
        testTypeField: "All",
      },
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearNameEMRField = this.clearNameEMRField.bind(this);
    this.handleShowResultsEntryPage = this.handleShowResultsEntryPage.bind(this);
    this.renderDataWithFilters = this.renderDataWithFilters.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLabOrders());
  }

  handleShowResultsEntryPage(order) {
    const { history } = this.props;
    history.push({
      pathname: "/LabResultEntry",
      state: order,
    });
  }


  clearNameEMRField() {
    this.setState({
      filters: {
        nameField: "",
      },
    });
  }

  handleFilterChange(field, value) {
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [field]: value,
      },
    });
  }

  renderDataWithFilters(filters, data) {
    let originalData = data;

    if (filters.nameField !== "") {
      const inputValue = filters.nameField;
      const filteredData = matchSorter(originalData, inputValue, { keys: ['patient.display'] });
      originalData = filteredData;
    }

    if (filters.dateToField && filters.dateFromField) {
      const filteredData = getDateRange(originalData, filters.dateFromField, filters.dateToField, 'dateActivated');
      originalData = filteredData;
    }

    if (filters.testTypeField !== "All") {
      const inputValue = filters.testTypeField;
      const filteredData = matchSorter(originalData, inputValue, { keys: ['concept.display'] });
      originalData = filteredData;
    }

    return originalData;
  }

  renderDraftOrderTable() {
    const { orders } = this.props;
    const { filters } = this.state;
    const fields = ["EMR ID", "NAME", "ORDER ID", "ORDER DATE", "COLLECTION DATE", "URGENCY", "TEST TYPE"];

    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    <FormattedMessage
      id={`app.labOrdersList.${columnName.replace(" ", "_")}`}
      defaultMessage={`${columnName}`}
      description={`LabOrderList table header for ${columnName}`} />
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} />,
      className: `lab-order-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-order-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    return (
      <div className="lab-order-list">
        <SortableTable
          data={orders}
          filters={filters}
          getDataWithFilters={this.renderDataWithFilters}
          columnMetadata={columnMetadata}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
          rowOnClick={this.handleShowResultsEntryPage}
          noDataMessage="No orders found"
        />
      </div>
    );
  }

  render() {
    const { labTests, isLoading } = this.props;
    const { filters: { dateFromField, dateToField, nameField } } = this.state;
    return (
      <div>
        <h1>
          <FormattedMessage
            id="app.labOrdersList.title"
            defaultMessage="Lab Test Results"
            description="Welcome header on LabTestResult page" />
        </h1>
        <React.Fragment>
          <div>
            {!isLoading
              && (
                <LabOrderListFilters
                  handleFieldChange={this.handleFilterChange}
                  clearNameEMRField={this.clearNameEMRField}
                  labTests={labTests}
                  dateFromField={dateFromField}
                  dateToField={dateToField}
                  nameField={nameField}

                />
              )}
          </div>
          {isLoading
            ? <div className="loader lab-order-list" />
            : this.renderDraftOrderTable()
          }
        </React.Fragment>
      </div>
    );
  }
}

LabOrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  labTests: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export const mapStateToProps = ({
  labOrders: { orders, labTests, isLoading },
}) => ({
  orders,
  labTests,
  isLoading,
});


const LabOrdersListContainer = (
  propsFromState,
  Component,
) => withRouter(connect(propsFromState)(Component));

export default LabOrdersListContainer(mapStateToProps, LabOrdersList);
