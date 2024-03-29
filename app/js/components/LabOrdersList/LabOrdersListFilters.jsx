import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  CustomDatePicker as DatePicker, Dropdown, PatientSearch, selectors, patientActions, patientUtil,
} from '@openmrs/react-components';
import { FormControl } from "react-bootstrap";
import { FULFILLER_STATUS } from '../../constants';

class LabOrderListFilters extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFieldChange = props.handleFieldChange;

    this.state = {
      accessionNumber: props.accessionNumber,
      accessionNumberDirty: false,
    };
  }

  // there may be a better way to do this but all this complexity is because:
  // * unlike the other fields, we only want to trigger a new search (ie. "handleFieldChange")
  //   on leaving field focus or hitting enter
  // * but we do still want to hold state of the element when the use clicks into a record and back
  // * and wanted to work around the issue where hitting enter and then leaving focus to click
  //   leads to a double-search

  updateAccessionNumberInput(value) {
    this.setState({
      accessionNumber: value,
      accessionNumberDirty: true,
    });
  }

  updateAccessionNumber(value) {
    const { accessionNumberDirty } = this.state;

    if (accessionNumberDirty) {
      this.handleFieldChange('accessionNumber', value);
      this.setState({ accessionNumberDirty: false });
    }
  }

  renderAccessionNumberField() {
    const { intl } = this.props;
    const { accessionNumber } = this.state;
    const enterLabIdLabel = intl.formatMessage({ id: "app.labOrdersListFilters.accessionNumberPlaceholder", defaultMessage: "Enter Lab ID" });
    const labIdLabel = intl.formatMessage({ id: "app.labOrdersListFilters.accessionNumber", defaultMessage: "Lab ID" });
    return (
      <span className="accession-number-filter">
        <span>{ labIdLabel }</span>
        <FormControl
          type="text"
          placeholder={enterLabIdLabel}
          value={accessionNumber}
          onBlur={(e) => this.updateAccessionNumber(e.target.value)}
          onChange={(e) => this.updateAccessionNumberInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              // keyCode 13 = Enter key
              this.updateAccessionNumber(e.target.value);
            }
          }}
        />
      </span>
    );
  }

  renderNameOrIdFilter() {
    const { dispatch, patient, intl } = this.props;
    return (
      <span className="name-emrid-order-filter" data-cy="patient-search">
        {patient
          ? (
            <span>
              {patientUtil.getFullName(patient)}
              {' '}
              (
              {patientUtil.getPreferredIdentifier(patient)}
              )
              {' '}
              <i className="small scale icon-remove-sign" role="toolbar" onClick={() => dispatch(patientActions.clearSelectedPatient())} />
            </span>
          )

          : (
            <PatientSearch
              clearSearchResultsWhenClearingSearchBox
              placeholder={intl.formatMessage({ id: "app.labOrdersListFilters.textSearchTitle", defaultMessage: "Search for patient" })}
              selectRowAutomaticallyIfOnlyOneRow
              showEmptyListContainer={false}
              showRefreshButton={false}
              showPatientCount={false}
              showSearchButton={false}
              title=""
            />
          )}
      </span>
    );
  }

  renderAddOrderButton() {
    const { orderLabTestLink, intl } = this.props;
    const contextPath = window.location.href.split('/')[3];
    const orderLabsUrl = `/${contextPath}/${orderLabTestLink}`;
    const addOrderMessage = intl.formatMessage({ id: "app.labOrders.addOrder.button", defaultMessage: "Add Order" });
    if (orderLabTestLink && orderLabTestLink.length > 0) {
      return (
        <span className="addOrder-span">
          <button type="button" className="btn addOrder-button" onClick={() => window.location.assign(orderLabsUrl)}>
            { addOrderMessage }
          </button>
        </span>
      );
    }
    return (<span />);
  }

  renderDatePickerFilters() {
    const {
      handleFieldChange, dateFromField, dateToField, intl,
    } = this.props;
    const fromMessage = intl.formatMessage({ id: "app.labOrdersListFilters.searchDateFromLabel", defaultMessage: "From: " });
    const toMessage = intl.formatMessage({ id: "app.labOrdersListFilters.searchDateToLabel", defaultMessage: "To: " });
    return (
      <span className="date-picker-filter">
        <span>
          <DatePicker
            labelClassName="line"
            label={fromMessage}
            defaultDate={dateFromField.format('YYYY-MM-DD') || moment().subtract(8, 'days').format()}
            handleDateChange={(field, value) => handleFieldChange(field, value)}
            field="dateFromField"
          />
        </span>
        <span>
          <DatePicker
            labelClassName="line"
            label={toMessage}
            defaultDate={dateToField.format('YYYY-MM-DD') || moment().format()}
            field="dateToField"
            handleDateChange={(field, value) => handleFieldChange(field, value)}
          />
        </span>
      </span>
    );
  }

  renderTestStatusFilter() {
    const { handleFieldChange, testStatusField, intl } = this.props;
    const allMsg = intl.formatMessage({ id: "reactcomponents.all", defaultMessage: "All" });
    const statusMessage = intl.formatMessage({ id: "app.labOrdersListFilters.statusDropdownLabel", defaultMessage: "Status" });

    const statusOptions = [
      {
        uuid: FULFILLER_STATUS.ORDERED,
        display: intl.formatMessage({ id: `app.labResult.status.${FULFILLER_STATUS.ORDERED}`, defaultMessage: "Ordered" }),
      },
      {
        uuid: FULFILLER_STATUS.IN_PROGRESS,
        display: intl.formatMessage({ id: `app.labResult.status.${FULFILLER_STATUS.IN_PROGRESS}`, defaultMessage: "Collected" }),
      },
      {
        uuid: FULFILLER_STATUS.COMPLETED,
        display: intl.formatMessage({ id: `app.labResult.status.${FULFILLER_STATUS.COMPLETED}`, defaultMessage: "Reported" }),
      },
      {
        uuid: FULFILLER_STATUS.EXCEPTION,
        display: intl.formatMessage({ id: `app.labResult.status.${FULFILLER_STATUS.EXCEPTION}`, defaultMessage: "Not Performed" }),
      },
    ];

    return (
      <Dropdown
        className="form-filter-group"
        id="test-status-dropdown"
        label={statusMessage}
        input={{ value: testStatusField }}
        list={statusOptions}
        field="testStatusField"
        placeholder={ allMsg }
        handleSelect={(field, value) => handleFieldChange(field, value)}
      />
    );
  }

  renderTestTypeFilter() {
    const {
      labTests, handleFieldChange, testTypeField, intl, 
    } = this.props;
    const allMsg = intl.formatMessage({ id: "reactcomponents.all", defaultMessage: "All" });
    const selectFromListMsg = intl.formatMessage({ id: "reactcomponents.select.from.list", defaultMessage: "Select from the list" });
    const testTypeMsg = intl.formatMessage({ id: "app.labOrdersListFilters.searchDropdownLabel", defaultMessage: "Test Type" });
    return (
      <Dropdown
        className="form-filter-group"
        id="test-type-dropdown"
        label={testTypeMsg}
        defaultValue={allMsg}
        input={{ value: testTypeField }}
        list={labTests}
        field="testTypeField"
        placeholder={selectFromListMsg}
        handleSelect={(field, value) => handleFieldChange(field, value)}
      />
    );
  }

  render() {
    return (
      <div className="order-list-filters">
        <span className="top-filters">
          <span className="date-picker-filter">
            { this.renderDatePickerFilters() }
            { this.renderAddOrderButton() }
          </span>
        </span>

        <span className="bottom-filters">
          {this.renderNameOrIdFilter()}
          {this.renderAccessionNumberField()}
          <span className="status-dropdown">
            {this.renderTestStatusFilter()}
          </span>
          <span className="type-dropdown">
            {this.renderTestTypeFilter()}
          </span>
        </span>
      </div>
    );
  }
}

LabOrderListFilters.defaultProps = {
  orderLabTestLink: "",
  patient: null,
};

LabOrderListFilters.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  labTests: PropTypes.array.isRequired,
  orderLabTestLink: PropTypes.string,
  testStatusField: PropTypes.string.isRequired,
  testTypeField: PropTypes.string.isRequired,
  dateToField: PropTypes.object.isRequired,
  dateFromField: PropTypes.object.isRequired,
  accessionNumber: PropTypes.string.isRequired,
  patient: PropTypes.object,
};

const mapStateToProps = (state) => ({
  patient: selectors.getSelectedPatientFromStore(state),
});

export default connect(mapStateToProps)(injectIntl(LabOrderListFilters));
