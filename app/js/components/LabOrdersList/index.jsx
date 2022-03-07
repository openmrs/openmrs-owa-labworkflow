/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React, { PureComponent } from "react";
import R from "ramda";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import swal from "sweetalert";
import { Loader, selectors } from "@openmrs/react-components";
import ReactToPrint from "react-to-print";
import LabOrderListFilters from "./LabOrdersListFilters";
import {
  fetchLabOrders,
  cancelOrder,
  printLabel,
} from "../../actions/labOrdersAction";
import { setSelectedConcept } from "../../actions/labConceptsAction";
import { computeResultStatus } from "../../utils/helpers";
import {
  loadGlobalProperties,
  selectProperty,
} from "../../utils/globalProperty";
import filtersAction from "../../actions/filtersAction";
import patientAction from "../../actions/patientAction";
import { getLabOrderables } from "../../actions/labOrderablesAction";
import { DEFAULT_ORDERS_BATCH_SIZE, FULFILLER_STATUS } from "../../constants";
import "./lab-orders-list.scss";
import NoData from "./NoData";
import OrdersTable from "./OrdersTable";

export class LabOrdersList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleShowResultsEntryPage = this.handleShowResultsEntryPage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePrintLabel = this.handlePrintLabel.bind(this);

    this.state = {
      returnUrl: new URLSearchParams(location.search).get("returnUrl"),
    };
  }

  componentDidMount() {
    const { dispatch, labResultsTestOrderType } = this.props;
    loadGlobalProperties(dispatch);
    dispatch(getLabOrderables());
    dispatch(patientAction.setSelectedPatient(""));
    dispatch(setSelectedConcept(""));
    if (labResultsTestOrderType) {
      this.loadOrders();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      fetched,
      orders,
      labResultsTestOrderType,
      ordersBatchSize,
      selectedPatient,
      match,
    } = this.props;

    // TODO: this means that these two GPs are required
    // the intent of this is to trigger loading the orders after both these GPs have been loaded
    if (
      (prevProps.labResultsTestOrderType !== labResultsTestOrderType
        || prevProps.ordersBatchSize !== ordersBatchSize)
      && labResultsTestOrderType
      && ordersBatchSize
    ) {
      this.loadOrders();
    }

    if (selectedPatient !== prevProps.selectedPatient) {
      this.handlePatientChange();
    }

    // if a specific order uuid has been specified, redirect to the display page for that order after the orders have been fetched
    if (fetched && !prevProps.fetched && match.params.orderUuid && orders) {
      const orderToDisplay = this.props.orders.find(
        (o) => o.uuid === match.params.orderUuid,
      );
      if (orderToDisplay) {
        this.handleShowResultsEntryPage(orderToDisplay);
      }
    }
  }

  handleShowResultsEntryPage(order) {
    const unclickableStatuses = ["CANCELED", "EXPIRED"];
    if (!unclickableStatuses.includes(computeResultStatus(order))) {
      const { history, returnUrl } = this.props;
      history.push({
        pathname: "/LabResultEntry",
        state: order,
        returnUrl,
      });
    }
  }

  async handlePrintLabel(order) {
    const {
      sessionLocation, labelPrintingEndpoint, dispatch, intl, 
    } = this.props;

    const printMsg = intl.formatMessage({
      id: "app.lab.print.label",
      defaultMessage: "Print Lab Label ?",
    });
    const yesMsg = intl.formatMessage({
      id: "reactcomponents.yes",
      defaultMessage: "YES",
    });
    const noMsg = intl.formatMessage({
      id: "reactcomponents.no",
      defaultMessage: "NO",
    });
    const printConfirmation = await swal(printMsg, {
      buttons: {
        YES: yesMsg,
        NO: noMsg,
      },
    });
    if (printConfirmation === "YES") {
      const patient = {
        patient: order.patient.uuid,
        sessionLocation: sessionLocation.uuid,
        url: labelPrintingEndpoint,
      };

      dispatch(printLabel(patient));
    }
  }

  async handleCancel(order) {
    const { currentProvider, dispatch, intl } = this.props;
    const cancelMsg = intl.formatMessage({
      id: "app.lab.discontinue.question",
      defaultMessage: "Are you sure you would like to cancel this order ?",
    });
    const yesMsg = intl.formatMessage({
      id: "reactcomponents.yes",
      defaultMessage: "YES",
    });
    const noMsg = intl.formatMessage({
      id: "reactcomponents.no",
      defaultMessage: "NO",
    });
    const cancelConfirmation = await swal(cancelMsg, {
      buttons: {
        YES: yesMsg,
        NO: noMsg,
      },
    });
    if (cancelConfirmation === "YES") {
      const cancelledOrder = {
        careSetting: order.careSetting,
        concept: order.concept.uuid,
        patient: order.patient.uuid,
        encounter: order.encounter.uuid,
        action: "DISCONTINUE",
        orderer: currentProvider.uuid,
        previousOrder: order.uuid,
        type: "testorder",
        urgency: order.urgency,
      };

      dispatch(cancelOrder(cancelledOrder));
    }
  }

  handlePatientChange() {
    const {
      dispatch,
      labResultsTestOrderType,
      labOrdersListFilters,
      selectedPatient,
    } = this.props;

    const newFilters = {
      ...labOrdersListFilters,
      page: 0,
      patient: selectedPatient ? selectedPatient.uuid : "",
    };

    dispatch(fetchLabOrders(labResultsTestOrderType, newFilters));
    dispatch(filtersAction.setLabOrdersListFilters(newFilters));
  }

  async handleFilterChange(field, value) {
    const {
      dispatch,
      labOrdersListFilters,
      labResultsTestOrderType,
      ordersBatchSize,
    } = this.props;

    // set the field/value on the new filter here
    // the rest of the code in this function just handles "special cases"
    let newFilters = {
      ...labOrdersListFilters,
      ordersBatchSize: ordersBatchSize || DEFAULT_ORDERS_BATCH_SIZE,
      [field]: value,
    };
    const { excludeCanceledAndExpired } = newFilters;

    if (typeof excludeCanceledAndExpired === "undefined") {
      newFilters = {
        ...newFilters,
        excludeCanceledAndExpired: false,
      };
    }

    if (
      field === "nameField"
      || field === "testStatusField"
      || field === "testTypeField"
      || field === "pageSize"
      || field === "accessionNumber"
    ) {
      // defaults page to zero when a user starts typing
      newFilters = {
        ...newFilters,
        page: 0,
      };
    }

    if (field === "testStatusField") {
      newFilters = {
        ...newFilters,
        excludeCanceledAndExpired: false,
        includeNullFulfillerStatus: null,
        canceledOrExpiredOnOrBeforeDate: null,
        fulfillerStatus: null,
      };
      if (value.toUpperCase() === FULFILLER_STATUS.ALL) {
        newFilters = {
          ...newFilters,
          excludeCanceledAndExpired: false,
        };
      } else if (value === FULFILLER_STATUS.ORDERED) {
        newFilters = {
          ...newFilters,
          includeNullFulfillerStatus: true,
          fulfillerStatus: FULFILLER_STATUS.RECEIVED,
        };
      } else if (value === FULFILLER_STATUS.CANCELED_EXPIRED) {
        newFilters = {
          ...newFilters,
          excludeCanceledAndExpired: false,
          canceledOrExpiredOnOrBeforeDate: moment(
            labOrdersListFilters.dateToField,
          ).format("YYYY-MM-DD"),
        };
      } else if (value === FULFILLER_STATUS.COMPLETED) {
        newFilters = {
          ...newFilters,
          excludeCanceledAndExpired: false,
          fulfillerStatus: FULFILLER_STATUS.COMPLETED,
        };
      } else if (value === FULFILLER_STATUS.IN_PROGRESS) {
        newFilters = {
          ...newFilters,
          fulfillerStatus: FULFILLER_STATUS.IN_PROGRESS,
        };
      } else if (value === FULFILLER_STATUS.EXCEPTION) {
        newFilters = {
          ...newFilters,
          fulfillerStatus: FULFILLER_STATUS.EXCEPTION,
        };
      }
    } else if (field === "testTypeField") {
      if (value === "All") {
        newFilters = {
          ...newFilters,
          conceptUuids: "",
        };
      } else if (value && value !== "All") {
        newFilters = {
          ...newFilters,
          conceptUuids: value,
        };
      }
    }

    await dispatch(fetchLabOrders(labResultsTestOrderType, newFilters));
    await dispatch(filtersAction.setLabOrdersListFilters(newFilters));
  }

  loadOrders() {
    const { dispatch, labResultsTestOrderType, labOrdersListFilters } = this.props;

    // TODO: All this code literally does nothing. Get rid of it once we have tests.
    // TODO: can likely just replace with: dispatch(fetchLabOrders(labResultsTestOrderType,
    //       { ...labOrdersListFilters, excludeCanceledAndExpired: true }));
    let options = {
      ...labOrdersListFilters,
    };

    const { excludeCanceledAndExpired } = options;
    if (!excludeCanceledAndExpired) {
      options = {
        ...options,
        excludeCanceledAndExpired: false,
      };
    }

    dispatch(fetchLabOrders(labResultsTestOrderType, options));
  }

  render() {
    const {
      labTests,
      orders,
      fetched,
      orderLabTestLink,
      labOrdersListFilters,
      enableLabelPrinting,
      intl,
      locale,
      totalCount,
    } = this.props;
    const {
      dateFromField,
      dateToField,
      nameField,
      tablePageSize,
      testTypeField,
      testStatusField,
      accessionNumber,
    } = labOrdersListFilters;
    const { returnUrl } = this.state;
    const hasData = !R.isEmpty(orders) && !R.isEmpty(labTests);
    return (
      <div
        className="main-container"
        ref={(el) => {
          this.printableComponentRef = el;
        }}
      >
        <ReactToPrint
          trigger={() => (
            <button type="button" className="print-button">              
              <span
                className="glyphicon glyphicon-print"
                aria-hidden="true"
              />
            </button>
          )}
          content={() => this.printableComponentRef}
          onBeforeGetContent={() => {
            this.originalTablePageSize = tablePageSize;
            return this.handleFilterChange("pageSize", 3000);
          }}
          onAfterPrint={() => {
            this.handleFilterChange("pageSize", this.originalTablePageSize);
          }}
          documentTitle={`Lab ${moment(dateFromField).format("YYYY-MM-DD")} ${moment(dateToField).format("YYYY-MM-DD")}`}
        />
        <h3>
          <FormattedMessage
            id="app.labOrdersList.title"
            defaultMessage="Labs"
            description="Welcome header on LabTestResult page"
          />
        </h3>
        <LabOrderListFilters
          handleFieldChange={this.handleFilterChange}
          labTests={labTests}
          testTypeField={testTypeField}
          testStatusField={testStatusField}
          dateFromField={moment(dateFromField)}
          dateToField={moment(dateToField)}
          nameField={nameField}
          orderLabTestLink={orderLabTestLink}
          accessionNumber={accessionNumber}
        />
        {!fetched && <Loader />}
        {hasData && fetched && (
          <OrdersTable
            orders={orders}
            labOrdersListFilters={labOrdersListFilters}
            enableLabelPrinting={enableLabelPrinting}
            fetched={fetched}
            intl={intl}
            locale={locale}
            totalCount={totalCount}
            handleFilterChange={this.handleFilterChange}
            handleShowResultsEntryPage={this.handleShowResultsEntryPage}
            handleCancel={this.handleCancel}
            handlePrintLabel={this.handlePrintLabel}
          />
        )}
        {!hasData && fetched && (
          <NoData labOrdersListFilters={labOrdersListFilters} />
        )}
        {returnUrl && (
          <div>
            <br />
            <br />
            <button
              className="cancel"
              type="button"
              onClick={() => window.location.assign(returnUrl)}
            >
              Return
            </button>
          </div>
        )}
      </div>
    );
  }
}

LabOrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  labTests: PropTypes.array.isRequired,
};

export const mapStateToProps = (state) => ({
  orders: state.labOrders.orders,
  labTests: state.labOrders.labTests,
  totalCount: state.labOrders.totalCount,
  dateAndTimeFormat: selectProperty(state, "dateAndTimeFormat") || "",
  labResultsTestOrderType:
    selectProperty(state, "labResultsTestOrderType") || "",
  enableLabelPrinting: selectProperty(state, "enableLabelPrinting") || "",
  labelPrintingEndpoint: selectProperty(state, "labelPrintingEndpoint") || "",
  tablePageSize: selectProperty(state, "tablePageSize"),
  ordersBatchSize: selectProperty(state, "ordersBatchSize"),
  orderLabTestLink: selectProperty(state, "orderLabTestLink"),
  labOrdersListFilters: state.filters.labOrdersListFilters,
  fetched: state.labOrders.fetched,
  currentProvider: state.openmrs.session.currentProvider,
  sessionLocation: state.openmrs.session.sessionLocation,
  locale: state.openmrs.session.locale,
  selectedPatient: selectors.getSelectedPatient(state),
});

const LabOrdersListContainer = (propsFromState, Component) => (
  withRouter(connect(propsFromState)(Component))
);

export default injectIntl(
  LabOrdersListContainer(mapStateToProps, LabOrdersList),
);
