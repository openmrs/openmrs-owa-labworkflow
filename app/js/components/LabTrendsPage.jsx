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
  PatientHeader,
  SortableTable,
  obsRest,
} from '@openmrs/react-components';

import RangeCell from "./RangeCell";
import { fetchLabOrdersTrends } from '../actions/labOrdersAction';
import { getTestResultDate, getSampleDate } from '../utils/helpers';

import "../../css/lab-orders-trends-page.scss";

export const Cell = ({ columnName, conceptUuid, value }) => {
  switch (columnName) {
    case 'SAMPLE DATE': {
      return (
        <div className="table_cell sample-date">
          <span>{getSampleDate(value)}</span>
        </div>
      );
    }
    case 'RESULT DATE': {
      return (
        <div className="table_cell result-date">
          <span>{getTestResultDate(value)}</span>
        </div>
      );
    }
    case 'RESULT':
      return (
        <div className="table_cell result">
          <span>{value.value}</span>
        </div>
      );

    case 'NORMAL RANGE':
      return (
        <RangeCell conceptUUID={conceptUuid} />
      );
    default:
      return null;
  }
};
export class LabTrendsPage extends PureComponent {
  componentDidMount() {
    const { fetchLabOrdersTrends } = this.props;
    const conceptUuid = this.props.history.location.state.uuid;
    const patientUuid = this.props.patientHeaderDetail.uuid;
    fetchLabOrdersTrends(patientUuid, conceptUuid);
  }

  render() {
    const {
      labOrdersTrend: { result },
      patientHeaderDetail,
      history: { location: { state: { uuid } } },
    } = this.props;

    const fields = ["SAMPLE DATE", "RESULT DATE", "RESULT", "NORMAL RANGE"];
    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    {columnName}
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} conceptUuid={uuid} />,
      className: `lab-order-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-order-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));


    return (
      <div>
        {patientHeaderDetail && <PatientHeader patient={patientHeaderDetail} />}
        <h1>Lab trends page</h1>
        <div className="lab-orders-trend-list">
          <SortableTable
            data={result}
            columnMetadata={columnMetadata}
            filteredFields={fields}
            isSortable={false}
            noDataMessage="No orders found"
            defaultPageSize={10}
          />
        </div>
      </div>
    );
  }
}

LabTrendsPage.propTypes = {
  fetchLabOrdersTrends: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { labOrdersTrend, patient: { patient } } = state;

  return {
    labOrdersTrend,
    patientHeaderDetail: patient,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLabOrdersTrends: (patientUuid, conceptUuid) => {
    dispatch(fetchLabOrdersTrends(patientUuid, conceptUuid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LabTrendsPage);
