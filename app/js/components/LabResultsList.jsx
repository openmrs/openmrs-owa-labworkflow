import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SortableTable, Loader, constantsActions, CustomDatePicker as DatePicker,
} from '@openmrs/react-components';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import ConceptDisplay from './ConceptDisplay';
import patientAction from '../actions/patientAction';
import filtersAction from '../actions/filtersAction';
import { filterThrough, calculateTableRows } from '../utils/helpers';
import "../../css/lab-results-view.scss";


const patientUUID = process.env.NODE_ENV !== 'production'
  ? '70c9de3d-ce33-420b-818b-332acbfaf776' // your patient uuid will go here
  : '76f0fd80-2b5b-496a-8b68-539d7e532ad2';

const Cell = ({
  value, columnName, type, navigate,
}) => {
  if (type === 'single') {
    const hasNoEncounter = value.status === 'Ordered';
    const isPanel = value.order.concept.set;
    if (columnName === 'TYPE') {
      return (
        <div className="table_cell type">
          <span>{value.order.display}</span>
        </div>
      );
    }

    if (columnName === 'REQUEST DATE') {
      return (
        <div className="table_cell request-date">
          <span>{moment(value.order.dateActivated).format("DD-MMM-YYYY")}</span>
        </div>
      );
    }

    if (columnName === 'STATUS') {
      return (
        <div className="table_cell status">
          <span>{value.status}</span>
        </div>
      );
    }

    if (columnName === 'SAMPLE DATE' && !hasNoEncounter && !R.isEmpty(value.resultDate)) {
      return (
        <div className="table_cell sample-date">
          <span>{moment(value.resultDate.value).format("DD-MMM-YYYY") || ''}</span>
        </div>
      );
    }

    if (!isPanel && !hasNoEncounter) {
      const labResult = value.encounter.obs[0];
      if (labResult) {
        switch (columnName) {
          case 'RESULT':
            return (
              <div className="table_cell result">
                <ConceptDisplay conceptUUID={labResult.concept.uuid} type="result" value={labResult.value.display || labResult.value} />
              </div>
            );
          case 'NORMAL RANGE':
            return (
              <ConceptDisplay conceptUUID={labResult.concept.uuid} type="range" />
            );
          default:
            return null;
        }
      }
    }
    return null;
  }
  if (type === 'panel') {
    switch (columnName) {
      case 'TYPE': {
        return (
          <div
            className="table_cell type">
            <span>{value.concept.display}</span>
          </div>
        );
      }
      case 'RESULT':
        return (
          <div className="table_cell result">
            <ConceptDisplay conceptUUID={value.concept.uuid} type="result" value={value.value.display || value.value} />
          </div>
        );
      case 'NORMAL RANGE':
        return (
          <ConceptDisplay conceptUUID={value.concept.uuid} type="range" />
        );

      default: {
        return null;
      }
    }
  }
  return (
    <div className="spiner" />
  );
};

Cell.propTypes = {
  columnName: PropTypes.string.isRequired,
  value: PropTypes.shape({}).isRequired,
};

export class LabResultsList extends PureComponent {
  constructor() {
    super();
    this.state = {
      // would need to get this from the route ideally
      // if you're working locally, endeavour to hard code a valid patientUUID on line 12
      patientUUID,
    };

    this.handleShowLabTrendsPage = this.handleShowLabTrendsPage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const patient = new URLSearchParams(window.location.search).get('patient');
    
    const patientUuid = patient || patientUUID;
    if (patientUuid) {
      dispatch(constantsActions.fetchLabResultsDateConcept());
      dispatch(constantsActions.fetchLabResultsDidNotPerformQuestion());
      dispatch(constantsActions.fetchLabResultsDidNotPerformReasonQuestion());
      dispatch(constantsActions.fetchLabResultsTestOrderNumberConcept());
      dispatch(constantsActions.fetchLabResultsTestLocationQuestion());
      dispatch(constantsActions.fetchLabResultsEstimatedCollectionDateQuestion());
      dispatch(constantsActions.getDateAndTimeFormat());
      dispatch(patientAction.getPatient(patientUuid));
      dispatch(patientAction.fetchPatientLabTestResults(patientUuid));
    } else {
      // we would need to route back to the returnUrl once that functionality is in place
      window.location.href = '/';
    }
  }

  handleShowLabTrendsPage(data) {
    const { history } = this.props;
    if (data.order) {
      if (data.encounter && data.encounter.obs[0]) {
        const obs = data.encounter.obs[0];
        if (!obs.groupMembers) {
          history.push({
            pathname: "/labtrends",
            state: data.encounter.obs[0].concept,
          });
        }
      }
    } else if (data.concept) {
      history.push({
        pathname: "/labtrends",
        state: data.concept,
      });
    }
  }

  navigate(data) {
    this.handleShowLabTrendsPage(data);
  }

  handleFilterChange(field, value) {
    const { labResultListFilters, dispatch } = this.props;
    const newFilters = {
      ...labResultListFilters,
      [field]: value,
    };
    dispatch(filtersAction.setLabResultListFilters(newFilters));
  }

  renderLabResultsTable(labResults) {
    const { dateAndTimeFormat, labResultListFilters } = this.props;
    const fields = ["TYPE", "STATUS", "REQUEST DATE", "SAMPLE DATE", "RESULT", "NORMAL RANGE"];

    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className={`labs-result-table-head-${columnName.replace(' ', '-').toLocaleLowerCase()}`}>
    <FormattedMessage
      id={`app.labResultsList.${columnName.replace(" ", "_")}`}
      defaultMessage={`${columnName}`} />
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} dateAndTimeFormat={dateAndTimeFormat} type="single" show={false} navigate={this.handleShowLabTrendsPage} />,
      className: `lab-results-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-result-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    const expanderColumn = [
      {
        expander: true,
        getProps: (state, rowInfo, column) => {
          const isPanel = (rowInfo.original.order.concept.set) && (rowInfo.original.status === "Reported");
          return {
            style: {
              display: !isPanel ? 'none' : 'block',
            },
          };
        },
      },
      {
        Header: '',
        headerClassName: 'expander-cell-header',
        getProps: (state, rowInfo, column) => {
          let isNotExpanded = rowInfo.original.order.concept.set === false;
          if (rowInfo.original.status !== "Reported") {
            isNotExpanded = true;
          }
          return {
            style: {
              display: isNotExpanded ? 'block' : 'none',
            },
            className: 'expander-cell',
          };
        },
      }];
    const columns = expanderColumn.concat(columnMetadata);
    return (
      <div className="lab-results-list">
        <SortableTable
          data={labResults}
          filters={labResultListFilters}
          getDataWithFilters={filterThrough}
          columnMetadata={columns}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          rowOnClick={this.handleShowLabTrendsPage}
          isSortable={false}
          noDataMessage="No results found"
          defaultPageSize={calculateTableRows(labResults.length)}
          subComponent={(row) => {
            const isPanel = (row.original.order.concept.set) && (row.original.status === "Reported");
            const rowFields = ["TYPE", "RESULT", "NORMAL RANGE"];
            const rowColumnMetadata = rowFields.map(columnName => ({
              accessor: "",
              Cell: data => <Cell {...data} columnName={columnName} type="panel" navigate={this.handleShowLabTrendsPage} />,
              className: `lab-results-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
              headerClassName: 'lab-results-list-header',
            }));
            if (isPanel) {
              return (
                <div className="collapsible-panel">
                  <SortableTable
                    data={row.original.encounter.obs[0].groupMembers}
                    columnMetadata={rowColumnMetadata}
                    collapseOnDataChange={false}
                    collapseOnPageChange={false}
                    showPagination={false}
                    rowOnClick={this.handleShowLabTrendsPage}
                    defaultClassName=""
                  />
                </div>
              );
            }
            return '';
          }}
        />
      </div>
    );
  }

  renderDatePickerFilters() {
    const { labResultListFilters } = this.props;
    return (
      <span className="date-picker-filter">
        <span>
          <DatePicker
            labelClassName="line"
            label={(
              <FormattedMessage
                id="app.labResultsList.dateFromFilterLabel"
                defaultMessage="From: " />
            )}
            defaultDate={moment(labResultListFilters.dateFromField) || moment().subtract(8, 'days')}
            formControlStyle={{
              marginRight: '5px',
              width: '105px',
            }}
            handleDateChange={(field, value) => this.handleFilterChange(field, value)}
            field="dateFromField"
          />
        </span>
        <span>
          <DatePicker
            labelClassName="line"
            label={(
              <FormattedMessage
                id="app.labResultsList.dateToFilterLabel"
                defaultMessage="To: " />
            )}
            defaultDate={moment(labResultListFilters.dateToField) || moment()}
            field="dateToField"
            formControlStyle={{
              marginRight: '5px',
              width: '105px',
            }}
            handleDateChange={(field, value) => this.handleFilterChange(field, value)}
          />
        </span>
      </span>
    );
  }

  render() {
    const {
      patients,
      labResultsTestOrderNumberConcept,
      labResultsTestLocationQuestion,
      labResultsDateConcept,
      labResultsDidNotPerformReasonQuestion,
      labResultsEstimatedCollectionDateQuestion,
      labResultsDidNotPerformQuestion,
    } = this.props;
    const { patientUUID } = this.state;
    const selectedPatient = patients[patientUUID] || {};
    const { encounters = [], orders = [] } = selectedPatient;

    const getPatientLabResults = () => {
      const results = encounters.map((encounter) => {
        const testOrderObs = encounter.obs.filter(
          item => item.concept.uuid === labResultsTestOrderNumberConcept,
        );
        const resultDateObs = encounter.obs.filter(
          item => item.concept.uuid === labResultsDateConcept,
        );
        const testOrderNumber = testOrderObs[0].value;
        const matchedOrder = orders.filter(order => order.orderNumber === testOrderNumber);
        const hasObs = !R.isEmpty(encounter.obs);
        const concealedConceptUUIDs = [
          labResultsTestOrderNumberConcept,
          labResultsTestLocationQuestion,
          labResultsDateConcept,
          labResultsDidNotPerformReasonQuestion,
          labResultsEstimatedCollectionDateQuestion,
          labResultsDidNotPerformQuestion,
        ];
        if (hasObs) {
          const obs = R.pipe(
            R.filter(item => !concealedConceptUUIDs.includes(item.concept.uuid)),
          )(encounter.obs);
          if (!R.isEmpty(obs)) {
            return {
              order: matchedOrder[0],
              encounter: {
                ...encounter,
                obs,
              },
              resultDate: resultDateObs[0] || {},
              status: 'Reported',
            };
          }

          return {
            order: matchedOrder[0],
            encounter: {
              ...encounter,
              obs,
            },
            resultDate: resultDateObs[0] || {},
            status: 'Taken',
          };
        }
      });

      const filteredOrders = orders.filter((order) => {
        const matchedResult = results.filter(item => item.order.orderNumber === order.orderNumber);
        return R.isEmpty(matchedResult);
      });

      const orderedTests = filteredOrders.map(order => ({
        order,
        status: 'Ordered',
      }));
      const labResults = orderedTests.concat(results);

      return labResults;
    };

    if (!R.isEmpty(selectedPatient) && !R.isEmpty(orders)) {
      const labResults = getPatientLabResults();
      return (
        <div className="main-container">
          <h2>
            <FormattedMessage
              id="app.labResultsList.title"
              defaultMessage="Lab Test Results" />
          </h2>

          <React.Fragment>
            <div className="lab-result-list-filters">
              {this.renderDatePickerFilters()}
            </div>
            {this.renderLabResultsTable(labResults)}
          </React.Fragment>
        </div>
      );
    }
    return (
      <Loader />
    );
  }
}

LabResultsList.propTypes = {
  dateAndTimeFormat: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export const mapStateToProps = ({
  openmrs: {
    CONSTANTS: {
      dateAndTimeFormat,
      labResultsTestOrderNumberConcept,
      labResultsTestLocationQuestion,
      labResultsDateConcept,
      labResultsDidNotPerformReasonQuestion,
      labResultsEstimatedCollectionDateQuestion,
      labResultsDidNotPerformQuestion,
    },
  },
  patients,
  filters: { labResultListFilters },
}) => ({
  patients,
  dateAndTimeFormat,
  labResultsTestOrderNumberConcept,
  labResultsTestLocationQuestion,
  labResultsDateConcept,
  labResultsDidNotPerformReasonQuestion,
  labResultsEstimatedCollectionDateQuestion,
  labResultsDidNotPerformQuestion,
  labResultListFilters,
});

export default connect(mapStateToProps)(LabResultsList);