import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import {
  Loader, CustomDatePicker as DatePicker, Dropdown, withLocalization,
} from '@openmrs/react-components';
import ReactToPrint from "react-to-print";
import moment from 'moment';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import { isLabSet, isTest } from "./util";
import patientAction from '../../actions/patientAction';
import filtersAction from '../../actions/filtersAction';
import { fetchLabCategoriesSet } from '../../actions/labConceptsAction';
import Patientheader from '../shared/PatientHeader';
import { loadGlobalProperties, selectProperty } from '../../utils/globalProperty';
import {
  sortByDate,
  filterDuplicates,
  getConceptShortName,
} from '../../utils/helpers';
import "../../../css/lab-results-view.scss";
import LabResultsTable from './LabResultsTable';

function isLabCategSelected(filters, uuid) {
  let selected = false;
  if (filters && filters.labCategory) {
    const labCategIds = Object.keys(filters.labCategory);
    if (labCategIds && labCategIds.includes(uuid)) {
      selected = true;
    }
  }
  return selected;
}

class LabResultsList extends PureComponent {
  constructor() {
    super();

    this.state = {
      patientUUID: new URLSearchParams(window.location.search).get('patient'),
      returnUrl: new URLSearchParams(window.location.search).get('returnUrl'),
      globalPropertiesFetched: false,
      isPrinting: false,
    };

    this.cellsLoaded = {};
    this.resolveCellsLoadingPromise = null;
    this.cellsLoadingPromise = new Promise((resolve) => {
      this.resolveCellsLoadingPromise = resolve;
    });

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleNavigateBack = this.handleNavigateBack.bind(this);
    this.handleCellLoaded = this.handleCellLoaded.bind(this);
  }

  UNSAFE_componentWillMount() {
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
      labCategoriesConceptSetUUID,
      dispatch,
    } = this.props;

    const {
      globalPropertiesFetched,
    } = this.state;

    // load the laboratory categories
    if (labCategoriesConceptSetUUID && !prevProps.labCategoriesConceptSetUUID) {
      dispatch(fetchLabCategoriesSet(labCategoriesConceptSetUUID));
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

  handleLabCategorySelection(panel) {
    const { labResultListFilters, dispatch } = this.props;

    const categoryFilter = {};
    let panelPresent = false;
    if (labResultListFilters.labCategory) {
      const labCategIds = Object.keys(labResultListFilters.labCategory);
      for (let i = 0; i < labCategIds.length; i += 1) {
        if (labCategIds[i] !== panel.uuid) {
          categoryFilter[labCategIds[i]] = labResultListFilters.labCategory[labCategIds[i]];
        } else {
          // if the filter was already present when the button was clicked
          // then remove the filter when the button is un-clicked
          panelPresent = true;
        }
      }
    }
    if (!panelPresent) {
      categoryFilter[panel.uuid] = panel;
    }
    const newFilters = {
      ...labResultListFilters,
      labCategory: categoryFilter,
      page: 0,
    };

    // create a new cellsLoadingPromise because some new cells might have to load
    this.cellsLoadingPromise = new Promise((resolve) => {
      this.resolveCellsLoadingPromise = resolve;
    });

    return dispatch(filtersAction.setLabResultListFilters(newFilters));
  }

  handleFilterChange(field, value) {
    const { labResultListFilters, dispatch } = this.props;
    let newFilters = {
      ...labResultListFilters,
      [field]: value,
    };

    if (field === 'pageSize' || field === 'dateFromField' || field === 'dateToField' || field === 'testTypeField') {
      // defaults page to zero when changing pageSize, date filter, or test filter
      newFilters = {
        ...newFilters,
        page: 0,
      };
      // create a new cellsLoadingPromise because some new cells might have to load
      this.cellsLoadingPromise = new Promise((resolve) => {
        this.resolveCellsLoadingPromise = resolve;
      });
    }
    return dispatch(filtersAction.setLabResultListFilters(newFilters));
  }

  handleNavigateBack() {
    const { returnUrl } = this.state;
    window.location = returnUrl;
  }

  handleCellLoaded(name, obs) {
    this.cellsLoaded = { ...this.cellsLoaded, [name + obs.uuid]: true };
    if (Object.keys(this.cellsLoaded).length >= (this.currentPageSize * 2)) {
      this.resolveCellsLoadingPromise();
    }
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

  renderTestTypeFilter(labTests) {
    const {
      labResultListFilters, intl,
    } = this.props;
    const allMsg = intl.formatMessage({ id: "reactcomponents.all", defaultMessage: "All" });
    const selectFromListMsg = intl.formatMessage({ id: "reactcomponents.select.from.list", defaultMessage: "Select from the list" });
    const testTypeMsg = `${intl.formatMessage({ id: "app.labOrdersListFilters.searchDropdownLabel", defaultMessage: "Test Type" })}:`;

    return (
      <Dropdown
        id="test-type-dropdown"
        className="test-type-filter"
        label={testTypeMsg}
        defaultValue={allMsg}
        input={{ value: labResultListFilters.testTypeField }}
        list={labTests}
        field="testTypeField"
        placeholder={selectFromListMsg}
        handleSelect={(field, value) => this.handleFilterChange(field, value)}
      />
    );
  }

  renderLabCategories() {
    const {
      labCategoriesSet, labResultListFilters, locale,
    } = this.props;

    return (
      <fieldset className="fieldset">
        <div className="panel-box">
          { labCategoriesSet.length ? (
            labCategoriesSet.map((panel) => (
              <button
                id="panel-button"
                type="button"
                key={`${panel.uuid}`}
                onClick={() => this.handleLabCategorySelection(panel)}
                className={classNames('lab-tests-btn', {
                  active: isLabCategSelected(labResultListFilters, panel.uuid),
                })}
              > 
                {' '}
                { getConceptShortName(panel, locale) }
              </button>
            ))
          ) : (
            <p>Loading lab categories</p>
          )}
        </div>
      </fieldset>
    );
  }

  render() {
    const {
      history,
      patients,
      labResultListFilters,
      labCategoriesFlattenedSet,
    } = this.props;

    const { patientUUID, isPrinting } = this.state;

    const selectedPatient = patients[patientUUID] || {};

    // returns "true" if concept set not defined
    const inLabCategoriesSet = ((o) => !labCategoriesFlattenedSet
        || !(labCategoriesFlattenedSet instanceof Set)
      || labCategoriesFlattenedSet.has(o.concept.uuid));

    const {
      encounters = [],
      labResultFetchStatus = false,
      error = false,
      errorMessage = "",
    } = selectedPatient;

    // build a list of all obs from the encounters that are of type LabSet or Test
    const getPatientLabResults = () => {
      const unfiltered = encounters.reduce((acc, encounter) => {
        let obs = encounter.obs ? encounter.obs : [];
        // flatten obs groups into a single list of Lab Sets and Tests
        while (obs.some((o) => o.groupMembers && !isLabSet(o))) {
          obs = obs.flatMap((o) => (o.groupMembers && !isLabSet(o) ? o.groupMembers : o));
        }
        obs = obs.filter((o) => (isLabSet(o) || isTest(o)) && inLabCategoriesSet(o));
        return [...acc, ...obs];
      }, {});
      const sorted = sortByDate('obsDatetime')(unfiltered).reverse();
      return filterDuplicates(sorted);
    };

    // iterates through all results (including results in panels) to build an ordered list of all
    // unique lab tests and panels within the list
    const getAllLabTestAndPanelTypes = (labResults) => {
      if (labResults && labResults.constructor === Array) {
        let obs = labResults;
        while (obs.some((o) => o.groupMembers)) {
          obs = obs.flatMap((o) => {
            if (o.groupMembers) {
              const { groupMembers, ...rest } = o;
              return [rest, ...o.groupMembers];
            }
            return o;
          });
        }
        return R.sortBy(R.compose(R.toLower, R.prop('display')))(R.uniq(obs.map(((o) => (o.concept)))));
      }
      return [];
    };
    
    const LocalizedPatientHeader = withLocalization(Patientheader);

    if (!error && !R.isEmpty(selectedPatient)) {
      const labResults = getPatientLabResults();
      this.currentPageSize = Math.min(labResults.length, labResultListFilters.pageSize || 10);
      const labTestAndPanelTypes = getAllLabTestAndPanelTypes(labResults);
      return (
        <div className="main-container">
          { isPrinting && <div className="spinner big-spinner" />}
          <ReactToPrint
            // eslint-disable-next-line
            trigger={() => (
              <button type="button" className="print-button" disabled={isPrinting}>
                <span
                  className="glyphicon glyphicon-print"
                  aria-hidden="true"
                />
              </button>
            )}
            content={() => this.printableComponentRef}
            onBeforeGetContent={() => {
              this.originalTablePageSize = labResultListFilters.pageSize || 10;
              return Promise.all([
                this.setState({ isPrinting: true }),
                this.handleFilterChange("pageSize", 3000),
                this.cellsLoadingPromise,
              ]);
            }}
            onAfterPrint={() => {
              this.handleFilterChange("pageSize", this.originalTablePageSize);
              this.setState({ isPrinting: false });
            }}
            documentTitle={`Lab ${moment(labResultListFilters.dateFromField).format("YYYY-MM-DD")} ${moment(labResultListFilters.dateToField).format("YYYY-MM-DD")}`}
          />
          <div ref={(el) => { this.printableComponentRef = el; }}>
            <h2>
              <FormattedMessage
                id="app.labResultsList.title"
                defaultMessage="Lab Test Results" />
            </h2>
            {this.state.isPrinting ? <LocalizedPatientHeader /> : null}
            <div className="lab-result-list-filters">
              {this.renderDatePickerFilters()}
              {this.renderTestTypeFilter(labTestAndPanelTypes)}
            </div>
            <div className="lab-selection-form">
              <form>
                { this.renderLabCategories() }
              </form>
            </div>
              <LabResultsTable
                labResults={labResults}
                fetched={labResultFetchStatus}
                handleCellLoaded={this.handleCellLoaded}
                handleFilterChange={this.handleFilterChange}
                history={history} />
          </div>
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

export const mapStateToProps = (state) => ({
  patients: state.patients,
  labResultsEntryEncounterType: selectProperty(state, 'labResultsEntryEncounterType') || '',
  labResultsEncounterTypes: selectProperty(state, 'labResultsEncounterTypes') || '',
  labCategoriesConceptSetUUID: selectProperty(state, 'labCategoriesConceptSet') || '',
  labCategoriesSet: state.CONSTANTS.labCategoriesSet,
  labCategoriesFlattenedSet: state.CONSTANTS.labCategoriesFlattenedSet,
  labResultListFilters: state.filters.labResultListFilters,
  locale: state.openmrs.session.locale,
});

export default connect(mapStateToProps)(injectIntl(LabResultsList));
