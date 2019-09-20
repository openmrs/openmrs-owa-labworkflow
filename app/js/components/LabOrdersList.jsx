/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import swal from 'sweetalert';
import { SortableTable, Loader } from '@openmrs/react-components';
import LabOrderListFilters from './LabOrdersListFilters';
import EncounterDisplay from './EncounterDisplay';
import { fetchLabOrders, cancelOrder } from '../actions/labOrdersAction';
import { setSelectedConcept } from '../actions/labConceptsAction';
import { filterThrough, calculateTableRows, getConceptShortName } from '../utils/helpers';
import translate from '../utils/translate';
import { loadGlobalProperties, selectProperty } from '../utils/globalProperty';
import filtersAction from '../actions/filtersAction';
import patientAction from '../actions/patientAction';
import "../../css/lab-orders-list.scss";


export const Cell = ({ columnName, value, handleCancel }) => {
  const orderedMsg = translate.getMessage("app.labResult.status.ordered", "Ordered");
  const cancelMsg = translate.getMessage("reactcomponents.cancel", "Cancel");
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
      const displayName = value.patient.display.split('-')[1].trim();
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
        <div className="table_cell order-id">
          <EncounterDisplay
            orderUUID={value.uuid}
            type="status"
          />
        </div>
      );
    case 'COLLECTION DATE': {
      return (
        <div className="table_cell order-date">
          <EncounterDisplay
            orderUUID={value.uuid}
            type="collectionDate"
          />
        </div>
      );
    }
    case 'ORDER DATE':
      return (
        <div className="table_cell order-date">
          <span>{moment(value.dateActivated).format("DD-MMM-YYYY")}</span>
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
          <span>{getConceptShortName(value.concept)}</span>
        </div>
      );
    case 'ACTIONS':
      if (value.labResult && (value.labResult.resultStatus === orderedMsg)) {
        return (
          <div className="discontinue-actn-btn">
            <span
              className="glyphicon glyphicon-remove tooltips"
              data-tooltip={ cancelMsg }
              aria-hidden="true"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCancel(value);
              }}
            />
          </div>
        );
      }
      return null;
    default:
      return null;
  }
};


export class LabOrdersList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearNameEMRField = this.clearNameEMRField.bind(this);
    this.handleShowResultsEntryPage = this.handleShowResultsEntryPage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      returnUrl: new URLSearchParams(location.search).get('returnUrl'),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    loadGlobalProperties(dispatch);
    dispatch(patientAction.setSelectedPatient(''));
    dispatch(setSelectedConcept(''));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, labResultsTestOrderType, labOrdersListFilters } = this.props;
    if (nextProps.labResultsTestOrderType !== labResultsTestOrderType) {
      const options = {
        dateToField: moment(labOrdersListFilters.dateToField).format('YYYY-MM-DD'),
        dateFromField: moment(labOrdersListFilters.dateFromField).format('YYYY-MM-DD'),
      };
      dispatch(fetchLabOrders(nextProps.labResultsTestOrderType, options));
    }
  }

  handleShowResultsEntryPage(order) {
    const unclickableStatuses = ["Canceled", "Expired"];
    if (!unclickableStatuses.includes(order.labResult.resultStatus)) {
      const { history, returnUrl } = this.props;
      history.push({
        pathname: "/LabResultEntry",
        state: order,
        returnUrl,
      });
    }
  }

  clearNameEMRField() {
    const { dispatch, labOrdersListFilters } = this.props;
    const newFilters = {
      ...labOrdersListFilters,
      nameField: "",
    };
    dispatch(filtersAction.setLabOrdersListFilters(newFilters));
  }

  async handleCancel(order) {
    const {
      currentProvider,
      dispatch,
      intl,
    } = this.props;
    const cancelMsg = translate.getMessage("app.lab.discontinue.question", "Are you sure you would like to cancel this order ?");
    const yesMsg = intl.formatMessage({ id: "reactcomponents.yes", defaultMessage: "YES" });
    const noMsg = intl.formatMessage({ id: "reactcomponents.no", defaultMessage: "NO" });
    const cancelConfirmation = await swal(cancelMsg, {
      buttons: {
        YES: yesMsg,
        NO: noMsg,
      },
    });
    if (cancelConfirmation === "YES") {
      const cancelledOrder = {
        careSetting: order.careSetting,
        concept: order.concept,
        patient: order.patient.uuid,
        encounter: order.encounter,
        action: "DISCONTINUE",
        orderer: currentProvider.uuid,
        previousOrder: order.uuid,
        type: "testorder",
        urgency: order.urgency,
      };

      dispatch(cancelOrder(cancelledOrder));
    }
  }

  handleFilterChange(field, value) {
    const { dispatch, labOrdersListFilters, labResultsTestOrderType } = this.props;
    let newFilters = {
      ...labOrdersListFilters,
      [field]: value,
    };
    if (field === 'nameField') {
      // defaults page to zero when a user starts typing
      newFilters = {
        ...newFilters,
        page: 0,
      };
    }
    if (field === 'dateToField') {
      const options = {
        dateToField: value,
        dateFromField: moment(labOrdersListFilters.dateFromField).format('YYYY-MM-DD'),
      };
      dispatch(fetchLabOrders(labResultsTestOrderType, options));
    }
    if (field === 'dateFromField') {
      const options = {
        dateToField: moment(labOrdersListFilters.dateToField).format('YYYY-MM-DD'),
        dateFromField: value,
      };
      dispatch(fetchLabOrders(labResultsTestOrderType, options));
    }
    dispatch(filtersAction.setLabOrdersListFilters(newFilters));
  }

  renderNoDataDisplayText() {
    const { labOrdersListFilters } = this.props;

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

  renderDraftOrderTable() {
    const {
      orders,
      dateAndTimeFormat,
      labOrdersListFilters,
      fetched,
      intl,
} = this.props;
    const fields = ["EMR ID", "NAME", "ORDER ID", "ORDER DATE", "COLLECTION DATE", "STATUS", "URGENCY", "TEST TYPE", "ACTIONS"];

    const noDataMessage = intl.formatMessage({ id: "app.orders.not.found", defaultMessage: "No orders found" });
    const rowsMessage = intl.formatMessage({ id: "reactcomponents.table.rows", defaultMessage: "Rows" });

    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className="labs-order-table-head">
    <FormattedMessage
      id={`app.labOrdersList.${columnName.replace(" ", "_")}`}
      defaultMessage={`${columnName}`}
      description={`LabOrderList table header for ${columnName}`} />
  </span>,
      accessor: "",
      filterAll: true,
      Cell: data => <Cell {...data} columnName={columnName} handleCancel={this.handleCancel} />,
      className: `lab-order-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-order-list-column-header lab-order-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    return (
      <div className="lab-order-list">
        <SortableTable
          data={orders}
          filters={labOrdersListFilters}
          getDataWithFilters={filterThrough}
          columnMetadata={columnMetadata}
          loading={!fetched}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
          onPageChange={page => this.handleFilterChange('page', page)}
          onPageSizeChange={pageSize => this.handleFilterChange('pageSize', pageSize)}
          rowOnClick={this.handleShowResultsEntryPage}
          noDataMessage={ noDataMessage }
          rowsText={ rowsMessage }
          minRows={0}
          page={labOrdersListFilters.page}
          defaultPageSize={labOrdersListFilters.pageSize || calculateTableRows(orders.length)}
        />
      </div>
    );
  }

  render() {
    const {
      labTests, orders, fetched, labOrdersListFilters: {
        dateFromField, dateToField, nameField, testTypeField, testStatusField,
      },
    } = this.props;
    const {
      returnUrl,
    } = this.state;
    const hasData = !R.isEmpty(orders) && !R.isEmpty(labTests);
    return (
      <div className="main-container">
        <h2>
          <FormattedMessage
            id="app.labOrdersList.title"
            defaultMessage="Labs"
            description="Welcome header on LabTestResult page" />
        </h2>
        <React.Fragment>
          <LabOrderListFilters
            handleFieldChange={this.handleFilterChange}
            clearNameEMRField={this.clearNameEMRField}
            labTests={labTests}
            testTypeField={testTypeField}
            testStatusField={testStatusField}
            dateFromField={moment(dateFromField)}
            dateToField={moment(dateToField)}
            nameField={nameField}
          />
          {!fetched && <Loader />}
          {(hasData && fetched) && this.renderDraftOrderTable()}
          {(!hasData && fetched) && this.renderNoDataDisplayText()}
          {returnUrl && (
            <div>
              <br />
              <br />
              <button className="cancel" type="button" onClick={() => window.location.assign(returnUrl)}>Return</button>
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

LabOrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  labTests: PropTypes.array.isRequired,
  dateAndTimeFormat: PropTypes.string.isRequired,
};

export const mapStateToProps = state => ({
  orders: state.labOrders.orders,
  labTests: state.labOrders.labTests,
  dateAndTimeFormat: selectProperty(state, 'dateAndTimeFormat') || '',
  labResultsTestOrderType: selectProperty(state, 'labResultsTestOrderType') || '',
  labOrdersListFilters: state.filters.labOrdersListFilters,
  fetched: state.labOrders.orders,
  currentProvider: state.openmrs.session.currentProvider,
  sessionLocation: state.openmrs.session.sessionLocation,
});

const LabOrdersListContainer = (
  propsFromState,
  Component,
) => withRouter(connect(propsFromState)(Component));

export default injectIntl(LabOrdersListContainer(mapStateToProps, LabOrdersList));
