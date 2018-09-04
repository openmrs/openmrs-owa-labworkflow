/*eslint-disable*/
import React,  { Component } from "react";
import PropTypes from "prop-types";
import matchSorter from "match-sorter";
import ReactTable from "react-table";


class SortableTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      filterInput: "",
      maxPages: 0,
      query: props.query || {}
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({
        query: nextProps.query
      });
    }
  }


  getTableData() {
    const { data } = this.props;
    return data;
  }


  selectedRowsClassName(rowInfo) {
    const { selectedRows } = this.props;
    let className = "";

    if (selectedRows && selectedRows.length) {
      if (rowInfo !== undefined && selectedRows.includes(rowInfo.row._id)) {
        className = "selected-row";
      }
    }

    return className;
  }

  renderColumnFilter() {
    const { filterType } = this.props;

    if (filterType === "both" || filterType === "column") {
      return true;
    }

    return false;
  }

  renderData() {
    const { filteredFields, filterType } = this.props;
    const { filterInput } = this.state;

    let originalData = [];


    if (filterType === "both" || filterType === "table") {
      const filteredData = matchSorter(originalData, filterInput, { keys: filteredFields });
      return filteredData;
    }

    return originalData;
  }

  renderColumns() {
    const { columnMetadata } = this.props;

    const displayColumns = columnMetadata.map((element) => {
      return Object.assign({}, element, {
        minWidth: undefined
      });
    });
    return displayColumns;
  }

  renderPaginationBottom() {
    if (this.getTableData() === 0) {
      return false;
    }

    return true;
  }

  setMinRows() {
    if (this.getTableData() === 0) {
      return 3;
    }

    return 0;
  }

  render() {
    const { ...otherProps } = this.props;
    const defaultClassName = "-striped -highlight";

    // All available props: https://github.com/tannerlinsley/react-table#props
    return (
      <div>
        <ReactTable
          className={otherProps.tableClassName || defaultClassName}
          columns={this.renderColumns()}
          data={otherProps.data || this.renderData()}
          defaultFilterMethod={this.customFilter}
          defaultPageSize={otherProps.defaultPageSize}
          filterable={this.renderColumnFilter()}
          minRows={this.setMinRows()}
          previousText={otherProps.previousText}
          nextText={otherProps.nextText}
          loadingText={otherProps.loadingText}
          noDataText={<span className="loader sortableTable-noDataText">{this.props.noDataMessage}</span>}
          pageText={otherProps.pageText}
          ofText={otherProps.ofText}
          rowsText={otherProps.rowsText}
          showPaginationTop={otherProps.showPaginationTop}
          sortable={otherProps.isSortable}
          showPaginationBottom={this.renderPaginationBottom()}
          getTrProps={(state, rowInfo, column, instance) => {
            if (otherProps.getTrProps) {
              return otherProps.getTrProps();
            }

            return {
              onClick: e => {
                console.log('row infoe', rowInfo);
                this.handleClick(rowInfo);
              },
              className: this.selectedRowsClassName(rowInfo)
            };
          }}
          getTableProps={otherProps.getTableProps}
          getTrGroupProps={otherProps.getTrGroupProps}
          getTheadProps={otherProps.getTheadProps}
          getPaginationProps={otherProps.getPaginationProps}
        />
      </div>
    );
  }
}

SortableTable.propTypes = {
  collection: PropTypes.object,
  columnMetadata: PropTypes.array,
  data: PropTypes.array,
  defaultPageSize: PropTypes.number,
  filterType: PropTypes.string,
  filteredFields: PropTypes.array,
  isFilterable: PropTypes.bool,
  isResizeable: PropTypes.bool,
  isSortable: PropTypes.bool,
  matchingResultsCount: PropTypes.string,
  minRows: PropTypes.number,
  noDataMessage: PropTypes.string,
  onRowClick: PropTypes.func,
  publication: PropTypes.string,
  query: PropTypes.object,
  selectedRows: PropTypes.array,
  transform: PropTypes.func
};

SortableTable.defaultProps = {
  defaultPageSize: 10,
  filterType: "table",
  isFilterable: false,
  isResizeable: true,
  isSortable: true,
  minRows: 0,
  noDataMessage: "No results found",
  previousText: "Previous",
  nextText: "Next",
  loadingText: "Loading...",
  noDataText: "No results found",
  pageText: "Page",
  ofText: "of",
  rowsText: "rows"
};

export default SortableTable;
