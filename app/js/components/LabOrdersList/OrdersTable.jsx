import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { SortableTable } from "@openmrs/react-components";
import { DEFAULT_TABLE_PAGE_SIZE } from "../../constants";
import { calculateTableRows, filterThrough } from '../../utils/helpers';
import Cell from "./Cell";

function OrdersTable({
  orders,
  labOrdersListFilters,
  enableLabelPrinting,
  fetched,
  intl,
  locale,
  totalCount,
  handleFilterChange,
  handleShowResultsEntryPage,
  handleCancel,
  handlePrintLabel,
}) {
  const fields = [
    "EMR ID",
    "NAME",
    "ORDER ID",
    "ORDER DATE",
    "LAB ID",
    "STATUS",
    "URGENCY",
    "TEST TYPE",
    "ACTIONS",
  ];

  const noDataMessage = intl.formatMessage({
    id: "app.orders.not.found",
    defaultMessage: "No orders found",
  });
  const rowsMessage = intl.formatMessage({
    id: "reactcomponents.table.rows",
    defaultMessage: "Rows",
  });
  const cancelMsg = intl.formatMessage({
    id: "reactcomponents.cancel",
    defaultMessage: "Cancel",
  });
  const printMsg = intl.formatMessage({
    id: "reactcomponents.print",
    defaultMessage: "Print",
  });

  const pageSize = labOrdersListFilters.pageSize
    ? labOrdersListFilters.pageSize
    : DEFAULT_TABLE_PAGE_SIZE;
  let pages = 0;
  if (totalCount && parseInt(totalCount, 10) > pageSize) {
    pages = Math.ceil(totalCount / pageSize);
  }

  const columnMetadata = fields.map((columnName) => ({
    Header: (
      <span className="labs-order-table-head">
        <FormattedMessage
          id={`app.labOrdersList.${columnName.replace(" ", "_")}`}
          defaultMessage={`${columnName}`}
          description={`LabOrderList table header for ${columnName}`}
        />
      </span>
    ),
    accessor: "",
    filterAll: true,
    // eslint-disable-next-line
    Cell: (data) => (
      <Cell
        {...data} // eslint-disable-line
        columnName={columnName}
        handleCancel={handleCancel}
        cancelMsg={cancelMsg}
        enableLabelPrinting={enableLabelPrinting}
        handlePrint={handlePrintLabel}
        printMsg={printMsg}
        locale={locale}
      />
    ),
    className: `lab-order-list-cell-${columnName
      .replace(" ", "-")
      .toLocaleLowerCase()}`,
    headerClassName: `lab-order-list-column-header lab-order-list-header-${columnName
      .replace(" ", "-")
      .toLocaleLowerCase()}`,
  }));
  return (
    <div className="lab-order-list" data-cy="order-list">
      <SortableTable
        data={orders}
        filters={labOrdersListFilters}
        locale={locale}
        manual
        pages={pages}
        getDataWithFilters={filterThrough}
        columnMetadata={columnMetadata}
        loading={!fetched}
        filteredFields={fields}
        filterType="none"
        showFilter={false}
        isSortable={false}
        onPageChange={(page) => handleFilterChange("page", page)}
        onPageSizeChange={(newPageSize) => handleFilterChange("pageSize", newPageSize)}
        rowOnClick={handleShowResultsEntryPage}
        noDataMessage={noDataMessage}
        rowsText={rowsMessage}
        minRows={0}
        page={labOrdersListFilters.page}
        defaultPageSize={
          labOrdersListFilters.pageSize || calculateTableRows(orders.length)
        }
      />
    </div>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  labOrdersListFilters: PropTypes.object.isRequired,
  enableLabelPrinting: PropTypes.string.isRequired,
  fetched: PropTypes.bool.isRequired,
  intl: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleShowResultsEntryPage: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handlePrintLabel: PropTypes.func.isRequired,
};

export default OrdersTable;