import React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";

export default function NoData({ labOrdersListFilters }) {
  const fromDate = `${moment(labOrdersListFilters.dateFromField).format('YYYY-MMM-DD')}`;
  const toDate = `${moment(labOrdersListFilters.dateToField).format('YYYY-MMM-DD')}`;
  return (
    <div className="no-data-container">
      <span>
        <FormattedMessage
          id="app.orders.not.found"
          defaultMessage="No orders found"
          description="No orders found" />
        &nbsp;
        <FormattedMessage
          id="app.from.label"
          defaultMessage="from"
          description="from" />
        &nbsp;
        { fromDate }
        &nbsp;
        <FormattedMessage
          id="app.to.label"
          defaultMessage="to"
          description="to" />
        &nbsp;
        { toDate }
      </span>
    </div>
  );
}
