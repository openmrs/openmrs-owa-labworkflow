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
import PropTypes from 'prop-types';

import SortableTable from './shared/SortableTable';
import { fetchLabOrders } from '../actions/labOrdersAction';

import { DEFAULT_DATE_FORMAT } from '../utils/constants';
import "react-table/react-table.css";
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
          <span>{value.display}</span>
        </div>
      );
    default:
      return null;
  }
};


export class LabOrdersList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLabOrders());
  }

  renderDraftOrderTable() {
    const { labOrders: { orders } } = this.props;
    const fields = ["EMR ID", "NAME", "ORDER ID", "ORDER DATE", "COLLECTION DATE", "URGENCY", "TEST TYPE"];

    const columnMetadata = fields.map(columnName => ({
      Header: <span className="labs-order-table-head">{columnName}</span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} />,
      className: `lab-order-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-order-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    return (
      <div className="lab-order-list">
        <SortableTable
          data={orders}
          columnMetadata={columnMetadata}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
        />
      </div>
    );
  }

  render() {
    const { labOrders } = this.props;
    return (
      <div>
        <h1>Welcome to LabOrdersList Page/Component</h1>
        <React.Fragment>
          {labOrders.isLoading
            ? <div className="loader lab-order-list" />
            : this.renderDraftOrderTable()
          }
        </React.Fragment>
      </div>
    );
  }
}

LabOrdersList.propTypes = {
  labOrders: PropTypes.shape({}).isRequired,
};


export const mapStateToProps = ({
  labOrders,
}) => ({
  labOrders,
});


const LabOrdersListContainer = (propsFromState, Component) => connect(propsFromState)(Component);

export default LabOrdersListContainer(mapStateToProps, LabOrdersList);
