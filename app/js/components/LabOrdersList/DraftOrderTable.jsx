import React from "react";
import { FormattedMessage } from "react-intl";

export function DraftOrderTable({
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

  console.log("page size", labOrdersListFilters.pageSize);
  const pageSize = labOrdersListFilters.pageSize
    ? labOrdersListFilters.pageSize
    : DEFAULT_TABLE_PAGE_SIZE;
  let pages = 0;
  if (totalCount && parseInt(totalCount) > pageSize) {
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
    Cell: (data) => (
      <Cell
        {...data}
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
        manual={true}
        pages={pages}
        getDataWithFilters={filterThrough}
        columnMetadata={columnMetadata}
        loading={!fetched}
        filteredFields={fields}
        filterType="none"
        showFilter={false}
        isSortable={false}
        onPageChange={(page) => handleFilterChange("page", page)}
        onPageSizeChange={(pageSize) =>
          handleFilterChange("pageSize", pageSize)
        }
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
