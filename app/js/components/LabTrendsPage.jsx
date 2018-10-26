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
} from '@openmrs/react-components';

import RangeCell from "./RangeCell";
import { fetchLabTestResults } from '../actions/labOrdersAction';
import { getTestResultDate, getSampleDate, getResultValue } from '../utils/helpers';

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
          <span>{getResultValue(value)}</span>
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
    const { fetchLabTestResults, patientHeaderDetail, history: { location: { state } } } = this.props;
    const conceptUuid = state.uuid;
    const patientUuid = patientHeaderDetail.uuid;
    fetchLabTestResults(patientUuid, conceptUuid);
  }

  render() {
    const {
      labTestResults: { results },
      patientHeaderDetail,
      history: { location: { state } },
    } = this.props;

    const fields = ["SAMPLE DATE", "RESULT DATE", "RESULT", "NORMAL RANGE"];
    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    {columnName}
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} conceptUuid={state.uuid} />,
      className: `lab-trends-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-trends-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));


    return (
      <div>
        {patientHeaderDetail && <PatientHeader patient={patientHeaderDetail} />}
        <h1>{`${state.display} Trend`}</h1>
        <div className="lab-orders-trend-list">
          <SortableTable
            data={results}
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
  fetchLabTestResults: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { labTestResults, patient: { patient } } = state;

  return {
    labTestResults,
    patientHeaderDetail: patient,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLabTestResults: (patientUuid, conceptUuid) => {
    dispatch(fetchLabTestResults(patientUuid, conceptUuid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LabTrendsPage);
