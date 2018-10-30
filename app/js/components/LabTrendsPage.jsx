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
    const { dispatch, patient, history: { location: { state } } } = this.props;
    const conceptUUID = state.uuid;
    const patientUUID = patient.uuid;
    dispatch(fetchLabTestResults(patientUUID, conceptUUID));
  }

  handleNavigateBack(history) {
    history.push({
      pathname: "/labresults",
    });
  }

  render() {
    const {
      labTestResults: { results },
      history,
    } = this.props;
    const { location: { state } } = history;
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
        <br />
        <button type="button" className="btn btn-lg btn-danger" onClick={() => this.handleNavigateBack(history)}>Back</button>
      </div>
    );
  }
}

LabTrendsPage.propTypes = {
  labTestResults: PropTypes.array.isRequired,
  patientHeaderDetail: PropTypes.object.isRequired,
};

const mapStateToProps = ({
  selectedPatient,
  patients,
  labTestResults,
}) => ({
  labTestResults,
  patient: patients[selectedPatient],
});

export default connect(mapStateToProps)(LabTrendsPage);
