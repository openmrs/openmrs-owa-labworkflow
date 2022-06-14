import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SortableTable } from '@openmrs/react-components';
import { injectIntl, FormattedMessage } from 'react-intl';
import "../../../css/lab-results-view.scss";
import { calculateTableRows, getDateRange } from '../../utils/helpers';
import { selectProperty } from '../../utils/globalProperty';
import Cell from './Cell';
import { isLabSet, isTest } from "./util";
import Row from './Row';

function filterData(filters, data) {
  let filteredData = data;

  if (filters.dateField !== undefined && filters.dateField === "obsDatetime") {
    if (filters.dateToField && filters.dateFromField) {
      filteredData = getDateRange(
        filteredData,
        filters.dateFromField,
        filters.dateToField,
        filters.dateField,
      );
    }
  }

  if (filters.testTypeField !== undefined && filters.testTypeField !== "" && filters.testTypeField.length === 36) { // === 36 to test if it's a uuid vs the "All/Tout" field
    const inputValue = filters.testTypeField;
    filteredData = filteredData.filter(
      (labTest) => labTest.concept.uuid === inputValue || (labTest.groupMembers
        && labTest.groupMembers.some((panelMember) => panelMember.concept.uuid === inputValue)),
    );
  }

  return filteredData;
}

class LabResultsTable extends PureComponent {
  constructor() {
    super();

    this.handleShowLabTrendsPage = this.handleShowLabTrendsPage.bind(this);    
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

  render() {
    const {
      labResults, fetched, handleCellLoaded, handleFilterChange,
      dateAndTimeFormat, labResultListFilters, intl, locale,
    } = this.props;
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
      // eslint-disable-next-line
      Cell: (data) => (
        <Cell
        {...data} // eslint-disable-line
          obs={data.value}
          columnName={columnName}
          dateAndTimeFormat={dateAndTimeFormat}
          type="single"
          show={false}
          navigate={this.handleShowLabTrendsPage}
          locale={locale}
          onLoaded={() => handleCellLoaded(columnName, data.value)}
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
        getProps: (state, rowInfo) => {
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
        getProps: (state, rowInfo) => {
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

    const filteredLabResults = filterData(labResultListFilters, labResults);
    const pageSize = labResultListFilters.pageSize || 10;
    const page = labResultListFilters.page || 0;
    const pageStartIndex = page * pageSize;
    const pageEndIndex = (page + 1) * pageSize;
    const pageData = filteredLabResults.slice(pageStartIndex, pageEndIndex);

    const loadingMessage = intl.formatMessage({ id: "app.results.loading", defaultMessage: "Searching..." });
    const noDataMessage = intl.formatMessage({ id: "app.results.not.found", defaultMessage: "No results found" });
    const rowsMessage = intl.formatMessage({ id: "reactcomponents.table.rows", defaultMessage: "Rows" });

    return (
      <div className="lab-results-list">
        <div className="lab-results-list-container">
          <SortableTable
            data={pageData}
            manual
            pages={Math.ceil(filteredLabResults.length / pageSize)}
            filters={labResultListFilters}
            getDataWithFilters={filterData}
            columnMetadata={columns}
            filteredFields={fields}
            filterType="none"
            showFilter={false}
            rowOnClick={this.handleShowLabTrendsPage}
            isSortable={false}
            onPageSizeChange={(newPageSize) => handleFilterChange('pageSize', newPageSize)}
            onPageChange={(newPage) => handleFilterChange('page', newPage)}
            page={page}
            noDataMessage={fetched ? noDataMessage : loadingMessage}
            rowsText={rowsMessage}
            defaultPageSize={labResultListFilters.pageSize || calculateTableRows(filteredLabResults.length)}
            subComponent={
              // eslint-disable-next-line react/no-unstable-nested-components
              (data) => (
                <Row rowData={data} handleShowLabTrendsPage={this.handleShowLabTrendsPage} />
              )
            }
          />
        </div>
      </div>
    );
  }
}

LabResultsTable.propTypes = {
  labResults: PropTypes.object.isRequired,
  fetched: PropTypes.bool.isRequired,
  handleCellLoaded: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  patients: state.patients,
  dateAndTimeFormat: selectProperty(state, 'dateAndTimeFormat') || '',
  labResultListFilters: state.filters.labResultListFilters,
  locale: state.openmrs.session.locale,
});

export default connect(mapStateToProps)(injectIntl(LabResultsTable));