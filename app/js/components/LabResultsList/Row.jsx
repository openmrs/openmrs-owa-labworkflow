import React from "react";
import { SortableTable } from "@openmrs/react-components";
import { isLabSet } from "./util";
import {
  getConceptShortName,
} from '../../utils/helpers';
import Cell from "./Cell";

export default function Row({ locale, rowData, handleShowLabTrendsPage }) {
  const isPanel = isLabSet(rowData.original);
  const rowFields = ["TEST TYPE", "RESULT", "NORMAL RANGE"];
  const rowColumnMetadata = rowFields.map((columnName) => ({
    accessor: "",
    // eslint-disable-next-line react/no-unstable-nested-components
    Cell: (data) => (
      <Cell
      {...data} // eslint-disable-line
        locale={locale}
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
    const sortedData = rowData.original.groupMembers
        && [...rowData.original.groupMembers].sort((obs1, obs2) => {
      if (!obs1 || !obs2.concept) {
        return 1
      }
      if (!obs2 || !obs2.concept) {
        return -1;
      }
      return getConceptShortName(obs1.concept, locale)
          .localeCompare(getConceptShortName(obs2.concept, locale))
    })

    return (
      <div className="collapsible-panel">
        <SortableTable
          data={sortedData}
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
