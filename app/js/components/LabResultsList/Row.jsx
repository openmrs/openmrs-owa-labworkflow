import React from "react";
import { SortableTable } from "@openmrs/react-components";
import { isLabSet } from "./util";
import Cell from "./Cell";

export default function Row(rowData, handleShowLabTrendsPage) {
  const isPanel = isLabSet(rowData.original);
  const rowFields = ["TEST TYPE", "RESULT", "NORMAL RANGE"];
  const rowColumnMetadata = rowFields.map((columnName) => ({
    accessor: "",
    // eslint-disable-next-line react/no-unstable-nested-components
    Cell: (data) => (
      <Cell
      {...data} // eslint-disable-line
        obs={data.value}
        columnName={columnName}
        type="panel"
        navigate={handleShowLabTrendsPage}
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
          data={rowData.original.groupMembers}
          columnMetadata={rowColumnMetadata}
          collapseOnDataChange={false}
          collapseOnPageChange={false}
          defaultPageSize={rowData.original.groupMembers.length}
          showPagination={false}
          rowOnClick={handleShowLabTrendsPage}
          defaultClassName=""
        />
      </div>
    );
  }
  return '';
}