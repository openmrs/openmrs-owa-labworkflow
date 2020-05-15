import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SortableTable, Loader, constantsActions, CustomDatePicker as DatePicker,
} from '@openmrs/react-components';
import moment from 'moment';
import { injectIntl, FormattedMessage } from 'react-intl';
import ConceptDisplay from './ConceptDisplay';
import patientAction from '../actions/patientAction';
import filtersAction from '../actions/filtersAction';
import { loadGlobalProperties, selectProperty } from '../utils/globalProperty';
import { filterThrough, calculateTableRows, getConceptShortName, sortByDate } from '../utils/helpers';
import "../../css/lab-results-view.scss";


const isLabSet = obs => obs.concept.conceptClass && obs.concept.conceptClass.name === 'LabSet';

const isTest = obs => obs.concept.conceptClass && obs.concept.conceptClass.name === 'Test';

const Cell = ({
  value, columnName, locale
}) => {

  // TODO use concept display for this?
  if (columnName === 'TEST TYPE') {
    return (
      <div className="table_cell type">
        <span>{value.concept ? value.concept.display : ''}</span>
      </div>
    );
  }

  if (columnName === 'DATE') {
    return (
      <div className="table_cell date">
        <span>{moment(value.obsDatetime).format("DD-MMM-YYYY") || ''}</span>
      </div>
    );
  }

  if (columnName === 'RESULT') {
    return (
      <div className="table_cell result">
        <ConceptDisplay
          conceptUUID={value.concept.uuid}
          type="result"
          value={value.value ? getConceptShortName(value.value, locale) : null}
        />
      </div>
    );
  }

  if (columnName === 'NORMAL RANGE') {
    return (
      <ConceptDisplay conceptUUID={value.concept.uuid} type="range" />
    );
  }

  return (
    <div className="spiner" />
  );
};

Cell.propTypes = {
  columnName: PropTypes.string.isRequired,
  value: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired
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

  componentDidUpdate() {
    const { patientUUID } = this.state;
    const {
      labResultsEntryEncounterType,
      labResultsEncounterTypes,
      dispatch,
    } = this.props;

    const {
      globalPropertiesFetched,
    } = this.state;

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
    const newFilters = {
      ...labResultListFilters,
      [field]: value,
    };
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
    const noDataMessage = intl.formatMessage({ id: "app.results.not.found", defaultMessage: "No results found" });
    const rowsMessage = intl.formatMessage({ id: "reactcomponents.table.rows", defaultMessage: "Rows" });

    return (
      <div className="lab-results-list">
        <SortableTable
          data={sortedListData}
          filters={labResultListFilters}
          getDataWithFilters={filterThrough}
          columnMetadata={columns}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          rowOnClick={this.handleShowLabTrendsPage}
          isSortable={false}
          onPageSizeChange={pageSize => this.handleFilterChange('pageSize', pageSize)}
          onPageChange={page => this.handleFilterChange('page', page)}
          page={labResultListFilters.page}
          noDataMessage={ noDataMessage }
          rowsText={ rowsMessage }
          defaultPageSize={labResultListFilters.pageSize || calculateTableRows(labResults.length)}
          subComponent={(row) => {
            const isPanel = isLabSet(row.original);
            const rowFields = ["TEST TYPE", "RESULT", "NORMAL RANGE"];
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
            defaultDate={moment(labResultListFilters.dateToField).format() || moment().format()}
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
    } = this.props;

    const { patientUUID } = this.state;

    const selectedPatient = patients[patientUUID] || {};

    const {
      encounters = [],
      labResultFetchStatus = false,
    } = selectedPatient;

    const getPatientLabResults = () => {
      // build a list of all obs from the encounters that are of type LabSet or Test
      return encounters.reduce((acc, encounter) => {
        const obs = encounter.obs ? encounter.obs.filter(o => isLabSet(o) || isTest(o)) : [];
        return [...acc, ...obs];
      }, {});
    };

    if (!R.isEmpty(selectedPatient)) {
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
            {this.renderLabResultsTable(labResults, labResultFetchStatus)}
          </React.Fragment>
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
    return (
      <Loader />
    );
  }
}

LabResultsList.propTypes = {
  dateAndTimeFormat: PropTypes.string.isRequired
};

export const mapStateToProps = state => ({
  patients: state.patients,
  dateAndTimeFormat: selectProperty(state, 'dateAndTimeFormat') || '',
  labResultsEntryEncounterType: selectProperty(state, 'labResultsEntryEncounterType') || '',
  labResultsEncounterTypes: selectProperty(state, 'labResultsEncounterTypes') || '',
  labResultListFilters: state.filters.labResultListFilters,
  locale: state.openmrs.session.locale
});

export default connect(mapStateToProps)(injectIntl(LabResultsList));
