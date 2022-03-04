import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SortableTable, Loader, CustomDatePicker as DatePicker,
} from '@openmrs/react-components';
import moment from 'moment';
import { injectIntl, FormattedMessage } from 'react-intl';
import ConceptDisplay from './ConceptDisplay';
import patientAction from '../actions/patientAction';
import filtersAction from '../actions/filtersAction';
import { fetchLabResultsToDisplayConceptSet } from '../actions/labConceptsAction';
import { loadGlobalProperties, selectProperty } from '../utils/globalProperty';
import {
  filterThrough, calculateTableRows, getConceptShortName, sortByDate, filterDuplicates, 
} from '../utils/helpers';
import "../../css/lab-results-view.scss";

const isLabSet = (obs) => obs.concept.conceptClass && obs.concept.conceptClass.name === 'LabSet';

const isTest = (obs) => obs.concept.conceptClass && obs.concept.conceptClass.name === 'Test';

function Cell({
  obs, columnName, locale,
}) {
  // TODO use concept display for this?
  if (columnName === 'TEST TYPE') {
    return (
      <div className="table_cell type">
        <span>{obs.concept ? obs.concept.display : ''}</span>
      </div>
    );
  }

  if (columnName === 'DATE') {
    return (
      <div className="table_cell date">
        <span>{moment(obs.obsDatetime).format("DD-MMM-YYYY") || ''}</span>
      </div>
    );
  }

  if (columnName === 'RESULT') {
    return (
      <div className="table_cell result">
        <ConceptDisplay
          conceptUUID={obs.concept.uuid}
          type="result"
          value={typeof obs.value === 'object' ? getConceptShortName(obs.value, locale) : obs.value}
        />
      </div>
    );
  }

  if (columnName === 'NORMAL RANGE') {
    return (
      <ConceptDisplay conceptUUID={obs.concept.uuid} type="range" />
    );
  }

  return (
    <div className="spiner" />
  );
}

Cell.propTypes = {
  columnName: PropTypes.string.isRequired,
  obs: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
};

export class LabResultsList extends PureComponent {
  constructor() {
    super();

    this.state = {
      patientUUID: new URLSearchParams(window.location.search).get('patient'),
      returnUrl: new URLSearchParams(window.location.search).get('returnUrl'),
      globalPropertiesFetched: false,
    };

    this.handleShowLabTrendsPage = this.handleShowLabTrendsPage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleNavigateBack = this.handleNavigateBack.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { patientUUID, returnUrl } = this.state;

    if (patientUUID) {
      loadGlobalProperties(dispatch);
      localStorage.setItem('returnUrl', returnUrl);
      dispatch(patientAction.getPatient(patientUUID));
    } else {
      window.location.href = returnUrl;
    }
  }

  componentDidUpdate(prevProps) {
    const { patientUUID } = this.state;
    const {
      labResultsEntryEncounterType,
      labResultsEncounterTypes,
      labResultsToDisplayConceptSetUUID,
      dispatch,
    } = this.props;

    const {
      globalPropertiesFetched,
    } = this.state;

    // load the concept set to display when (and if) that global property is loaded
    if (labResultsToDisplayConceptSetUUID && !prevProps.labResultsToDisplayConceptSetUUID) {
      dispatch(fetchLabResultsToDisplayConceptSet(labResultsToDisplayConceptSetUUID));
    }

    // load test results after the encounter types GPs have been loaded
    if (labResultsEntryEncounterType && labResultsEncounterTypes && !globalPropertiesFetched) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        globalPropertiesFetched: true,
      });
      dispatch(patientAction.fetchPatientLabTestResults(patientUUID));
    }
  }

  handleShowLabTrendsPage(obs) {
    // navigate to the lab trends page if the selected is a test (as opposed to a LabSet)
    const { history } = this.props;
    if (isTest(obs)) {
      history.push({
        pathname: "/labtrends",
        state: obs.concept,
      });
    }
  }

  navigate(data) {
    this.handleShowLabTrendsPage(data);
  }

  handleFilterChange(field, value) {
    const { labResultListFilters, dispatch } = this.props;
    let newFilters = {
      ...labResultListFilters,
      [field]: value,
    };

    if (field === 'pageSize') {
      // defaults page to zero when changing pageSize
      newFilters = {
        ...newFilters,
        page: 0,
      };
    }
    dispatch(filtersAction.setLabResultListFilters(newFilters));
  }

  handleNavigateBack() {
    const { returnUrl } = this.state;
    window.location = returnUrl;
  }

  renderLabResultsTable(labResults, fetched) {
    const { dateAndTimeFormat, labResultListFilters, intl } = this.props;
    const fields = ["TEST TYPE", "DATE", "RESULT", "NORMAL RANGE"];

    const columnMetadata = fields.map((columnName) => ({
      Header: (
        <span
          className={`labs-result-table-head-${columnName
            .replace(" ", "-")
            .toLocaleLowerCase()}`}
        >
          <FormattedMessage
            id={`app.labOrdersList.${columnName.replace(" ", "_")}`}
            defaultMessage={`${columnName}`}
          />
        </span>
      ),
      accessor: "",
      Cell: (data) => (
        <Cell
          {...data}
          obs={data.value}
          columnName={columnName}
          dateAndTimeFormat={dateAndTimeFormat}
          type="single"
          show={false}
          navigate={this.handleShowLabTrendsPage}
          locale={this.props.locale}
        />
      ),
      className: `lab-results-list-cell-${columnName
        .replace(" ", "-")
        .toLocaleLowerCase()}`,
      headerClassName: `lab-results-list-column-header lab-results-list-header-${columnName
        .replace(" ", "-")
        .toLocaleLowerCase()}`,
    }));

    const expanderColumn = [
      {
        expander: true,
        getProps: (state, rowInfo, column) => {
          const isPanel = isLabSet(rowInfo.original);
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
          const isNotExpanded = !isLabSet(rowInfo.original);
          return {
            style: {
              display: isNotExpanded ? 'block' : 'none',
            },
            className: 'expander-cell',
          };
        },
      }];
    const columns = expanderColumn.concat(columnMetadata);

    const sortedListData = sortByDate('obsDatetime')(labResults).reverse();
    const sortedFilteredListData = filterDuplicates(sortedListData);
    const loadingMessage = intl.formatMessage({ id: "app.results.loading", defaultMessage: "Searching..." });
    const noDataMessage = intl.formatMessage({ id: "app.results.not.found", defaultMessage: "No results found" });
    const rowsMessage = intl.formatMessage({ id: "reactcomponents.table.rows", defaultMessage: "Rows" });

    return (
      <div className="lab-results-list">
        <SortableTable
          data={sortedFilteredListData}
          filters={labResultListFilters}
          getDataWithFilters={filterThrough}
          columnMetadata={columns}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          rowOnClick={this.handleShowLabTrendsPage}
          isSortable={false}
          onPageSizeChange={(pageSize) => this.handleFilterChange('pageSize', pageSize)}
          onPageChange={(page) => this.handleFilterChange('page', page)}
          page={labResultListFilters.page}
          noDataMessage={fetched ? noDataMessage : loadingMessage}
          rowsText={rowsMessage}
          defaultPageSize={labResultListFilters.pageSize || calculateTableRows(labResults.length)}
          subComponent={(row) => {
            const isPanel = isLabSet(row.original);
            const rowFields = ["TEST TYPE", "RESULT", "NORMAL RANGE"];
            const rowColumnMetadata = rowFields.map((columnName) => ({
              accessor: "",
              Cell: (data) => (
                <Cell
                  {...data}
                  obs={data.value}
                  columnName={columnName}
                  type="panel"
                  navigate={this.handleShowLabTrendsPage}
                />
              ),
              className: `lab-results-list-cell-${columnName
                .replace(" ", "-")
                .toLocaleLowerCase()}`,
              headerClassName: "lab-results-list-header",
            }));
            if (isPanel) {
              return (
                <div className="collapsible-panel">
                  <SortableTable
                    data={row.original.groupMembers}
                    columnMetadata={rowColumnMetadata}
                    collapseOnDataChange={false}
                    collapseOnPageChange={false}
                    defaultPageSize={row.original.groupMembers.length}
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
                defaultMessage="Date From: " />
            )}
            defaultDate={moment(labResultListFilters.dateFromField).format() || moment().subtract(8, 'days').format()}
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
            defaultDate={moment(labResultListFilters.dateToField).format() || moment().format()}
            field="dateToField"
            handleDateChange={(field, value) => this.handleFilterChange(field, value)}
          />
        </span>
      </span>
    );
  }

  render() {
    const {
      patients,
      labResultsToDisplayConceptSet,
    } = this.props;

    const { patientUUID } = this.state;

    const selectedPatient = patients[patientUUID] || {};

    // returns "true" if concept set not defined
    const inLabResultsToDisplayConceptSet = ((o) => !labResultsToDisplayConceptSet
      || !(labResultsToDisplayConceptSet instanceof Set)
      || labResultsToDisplayConceptSet.has(o.concept.uuid));

    const {
      encounters = [],
      labResultFetchStatus = false,
      error = false,
      errorMessage = "",
    } = selectedPatient;

    const getPatientLabResults = () => 
      // build a list of all obs from the encounters that are of type LabSet or Test
      encounters.reduce((acc, encounter) => {
        let obs = encounter.obs ? encounter.obs : [];
        // flatten obs groups into a single list of Lab Sets and Tests
        while (obs.some((o) => o.groupMembers && !isLabSet(o))) {
          obs = obs.flatMap((o) => (o.groupMembers && !isLabSet(o) ? o.groupMembers : o));
        }
        obs = obs.filter((o) => (isLabSet(o) || isTest(o)) && inLabResultsToDisplayConceptSet(o));
        return [...acc, ...obs];
      }, {});
    if (!error && !R.isEmpty(selectedPatient)) {
      const labResults = getPatientLabResults();
      return (
        <div className="main-container">
          <h2>
            <FormattedMessage
              id="app.labResultsList.title"
              defaultMessage="Lab Test Results" />
          </h2>

          <div className="lab-result-list-filters">
            {this.renderDatePickerFilters()}
          </div>
          {this.renderLabResultsTable(labResults, labResultFetchStatus)}
          <br />
          <button type="button" className="btn btn-lg btn-danger" onClick={() => this.handleNavigateBack()}>Back</button>
        </div>
      );
    }

    if (labResultFetchStatus && R.isEmpty(encounters)) {
      const patientName = selectedPatient.person.personName.display.toUpperCase();
      return (
        <div className="no-data-container">
          <span>
            <FormattedMessage
              id="app.results.not.found"
              defaultMessage="No results found"
              description="No results found" />
            &nbsp;
            <FormattedMessage
              id="app.for.label"
              defaultMessage="for"
              description="for" />
            &nbsp;
            { patientName }
          </span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="no-data-container">
          <span>
            <FormattedMessage
              id="app.results.error"
              defaultMessage="Error" />
            &nbsp;
            { errorMessage }
          </span>
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
};

export const mapStateToProps = (state) => ({
  patients: state.patients,
  dateAndTimeFormat: selectProperty(state, 'dateAndTimeFormat') || '',
  labResultsEntryEncounterType: selectProperty(state, 'labResultsEntryEncounterType') || '',
  labResultsEncounterTypes: selectProperty(state, 'labResultsEncounterTypes') || '',
  labResultsToDisplayConceptSetUUID: selectProperty(state, 'labResultsToDisplayConceptSet') || '',
  labResultsToDisplayConceptSet: state.CONSTANTS.labResultsToDisplayConceptSet,
  labResultListFilters: state.filters.labResultListFilters,
  locale: state.openmrs.session.locale,
});

export default connect(mapStateToProps)(injectIntl(LabResultsList));
