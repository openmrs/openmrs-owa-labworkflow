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
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import { Redirect } from 'react-router-dom';
import {
  SortableTable,
  LineChart,
} from '@openmrs/react-components';
import { FormattedMessage } from 'react-intl';

import ConceptDisplay from "./ConceptDisplay";
import { fetchLabTestResults } from '../actions/labOrdersAction';
import {
  calculateTableRows,
  sortByDate,
} from '../utils/helpers';

import "../../css/lab-results-trends-page.scss";

export const Cell = ({ columnName, conceptUuid, value }) => {
  switch (columnName) {
    case 'SAMPLE DATE': {
      return (
        <div className="table_cell collection-date">
          <span>{moment(value.obsDatetime).format("DD-MMM-YYYY") || ''}</span>
        </div>
      );
    }
    case 'RESULT':
      return (
        <div className="table_cell result">
          <ConceptDisplay conceptUUID={conceptUuid} type="result" value={value.value && value.value.display ? value.value.display : value.value} />
        </div>
      );

    case 'NORMAL RANGE':
      return (
        <ConceptDisplay conceptUUID={conceptUuid} type="range" />
      );
    default:
      return null;
  }
};
export class LabTrendsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultPageSize: 10,
    };
  }

  componentDidMount() {
    const { dispatch, patient, history: { location: { state } } } = this.props;
    if (typeof state !== 'undefined') {
      const conceptUUID = state.uuid;
      const patientUUID = patient.uuid;
      dispatch(fetchLabTestResults(patientUUID, conceptUUID));
    }
  }

  handleNavigateBack() {
    const { history } = this.props;
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
    const { defaultPageSize } = this.state;
    const fields = ["SAMPLE DATE", "RESULT", "NORMAL RANGE"];

    if (!state) {
      return <Redirect to="/labresults" />;
    }

    const isNumeric = state.datatype.display === "Numeric";

    const resultTableClassName = cn({
      'lab-result-trend-list': true,
      full: !isNumeric,
    });

    const chartClassName = cn({
      'lab-results-trend-chart': true,
      hide: !isNumeric,
    });

    this.setState({ defaultPageSize: calculateTableRows(results.length) });

    const formatChartData = data => data.map(item => ({
      ...item,
      obsDatetime: moment(item.obsDatetime).format('DD-MMM-YYYY'),
    }));


    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    <FormattedMessage
      id={`app.labTrendsPage.${columnName.replace(" ", "_")}`}
      defaultMessage={`${columnName}`} />
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} conceptUuid={state.uuid} />,
      className: `lab-trends-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-trends-list-column-header lab-trends-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));

    const chartMargin = {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    };

    const chartData = R.compose(
      R.reverse,
      sortByDate('obsDateTime'),
      formatChartData,
    )(results);

    return (
      <div>
        <h1>{`${state.display} `}
          <FormattedMessage
            id="app.lab.results.trend"
            defaultMessage="Trend" />
        </h1>
        <div className="lab-trends-widgets">
          <div className={resultTableClassName}>
            <SortableTable
              data={results}
              columnMetadata={columnMetadata}
              filteredFields={fields}
              isSortable={false}
              noDataMessage="No orders found"
              minRows={0}
              defaultPageSize={defaultPageSize}
            />
          </div>
          <div className={chartClassName}>
            <LineChart
              data={chartData}
              height={280}
              width={500}
              yAxisLabel=""
              xAxisLabel=""
              xAxisKey="obsDatetime"
              margin={chartMargin}
              yAxisKey="value"
              type="linear"
            />
          </div>
        </div>
        <br />
        <button type="button" className="btn btn-lg btn-danger" onClick={() => this.handleNavigateBack()}>
          <FormattedMessage
            id="reactcomponents.back"
            defaultMessage="Back" />
        </button>
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
