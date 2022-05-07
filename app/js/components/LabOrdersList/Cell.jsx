import moment from "moment";
import React from "react";
import cn from "classnames";
import { FormattedMessage } from "react-intl";
import { computeResultStatus, getConceptShortName, isCancelable } from "../../utils/helpers";

function Cell({
  columnName, value, handleCancel, cancelMsg, enableLabelPrinting, handlePrint, printMsg, locale, 
}) {
  switch (columnName) {
    case 'EMR ID': {
      // TODO: refactor this and name column to use React Components patientUtils
      const emrID = value.patient.display.split('-')[0].trim();
      return (
        <div className="table_cell emr-id">
          <span>{emrID}</span>
        </div>
      );
    }
    case 'NAME': {
      const displayName = value.patient.person.display;
      return (
        <div className="table_cell name">
          <span>{displayName}</span>
        </div>
      );
    }
    case 'ORDER ID':
      return (
        <div className="table_cell order-id">
          <span>{value.orderNumber}</span>
        </div>
      );
    case 'STATUS':
      return (
        <div className="table_cell status">
          <span>
            <FormattedMessage
              id={`app.labResult.status.${computeResultStatus(value)}`}
              defaultMessage={computeResultStatus(value)}
            />
          </span>
        </div>
      );
    case 'ORDER DATE':
      return (
        <div className="table_cell order-date">
          <span>{moment(value.dateActivated).format("DD-MMM-YYYY")}</span>
        </div>
      );
    case 'LAB ID':
      return (
        <div className="table_cell lab-id">
          {value.accessionNumber}
        </div>
      );
    case 'URGENCY': {
      const urgencyClassName = cn({
        table_cell: true,
        urgency: true,
        stat: value.urgency === 'STAT',
        routine: value.urgency === 'ROUTINE',
      });
      return (
        <div className={urgencyClassName}>
          <span>{value.urgency}</span>
        </div>
      );
    }
    case 'TEST TYPE':
      return (
        <div className="table_cell test-type">
          <span>{getConceptShortName(value.concept, locale)}</span>
        </div>
      );
    case 'ACTIONS':
      return (
        <div className="actions-container">
          { enableLabelPrinting === 'true' ? (
            <div className="order-actn-btn">
              <span
                className="glyphicon glyphicon-print tooltips"
                data-tooltip={printMsg}
                aria-hidden="true"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePrint(value);
                }}
              />
            </div>
          ) : null }
          { isCancelable(value)
            ? (
              <div className="order-actn-btn">
                <span
                  className="glyphicon glyphicon-remove tooltips"
                  data-tooltip={cancelMsg}
                  aria-hidden="true"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCancel(value);
                  }}
                />
              </div>
            ) : null }
        </div>
      );
    default:
      return null;
  }
}

export default React.memo(Cell);