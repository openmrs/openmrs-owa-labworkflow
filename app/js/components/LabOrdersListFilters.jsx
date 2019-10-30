import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  FormControl,
} from 'react-bootstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { CustomDatePicker as DatePicker, Dropdown } from '@openmrs/react-components';
import { FULFILLER_STATUS } from '../constants';

class LabOrderListFilters extends PureComponent {
  renderNameEMROrOrderIdFilter() {
    const { handleFieldChange, clearNameEMRField, nameField } = this.props;
    return (
      <span className="form-filter-group one-third">
        <FormattedMessage
          id="app.labOrdersListFilters.textSearchTitle"
          defaultMessage="Search for a sample"
          description="Label for text search input" />
        <span className="name-emrid-order-filter">
          <i className="small icon-search" />
          <FormControl
            id="emr-name-search"
            autoFocus
            type="text"
            placeholder="search by ID or name, or scan sample"
            value={nameField}
            onChange={event => handleFieldChange('nameField', event.target.value)}
          />
          <i className="small scale icon-remove-sign" role="toolbar" onClick={event => clearNameEMRField()} />
        </span>
      </span>
    );
  }

  renderDatePickerFilters() {
    const { handleFieldChange, dateFromField, dateToField, intl } = this.props;
    const fromMessage = intl.formatMessage({ id: "app.labOrdersListFilters.searchDateFromLabel", defaultMessage: "From: " });
    const toMessage = intl.formatMessage({ id: "app.labOrdersListFilters.searchDateToLabel", defaultMessage: "To: " });
    return (
      <span className="date-picker-filter">
        <span>
          <DatePicker
            labelClassName="line"
            label={ fromMessage }
            defaultDate={dateFromField.format('YYYY-MM-DD') || moment().subtract(8, 'days').format()}
            handleDateChange={(field, value) => handleFieldChange(field, value)}
            field="dateFromField"
          />
        </span>
        <span>
          <DatePicker
            labelClassName="line"
            label={ toMessage }
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
    const allMsg = {
      uuid: "ALL",
      display: intl.formatMessage({ id: "reactcomponents.all", defaultMessage: "All" })
    };
    const selectFromListMsg = intl.formatMessage({ id: "reactcomponents.select.from.list", defaultMessage: "Select from the list" });
    const statusMessage = intl.formatMessage({ id: "app.labOrdersListFilters.statusDropdownLabel", defaultMessage: "Status" });

    const statusOptions = [
      {
        uuid:  FULFILLER_STATUS.ORDERED,
        display: intl.formatMessage({ id: "app.labResult.status." + FULFILLER_STATUS.ORDERED, defaultMessage: "Ordered" })
      },
      {
        uuid: FULFILLER_STATUS.IN_PROGRESS,
        display: intl.formatMessage({ id: "app.labResult.status." + FULFILLER_STATUS.IN_PROGRESS, defaultMessage: "Collected" }),
      },
      {
        uuid: FULFILLER_STATUS.COMPLETED,
        display: intl.formatMessage({ id: "app.labResult.status." + FULFILLER_STATUS.COMPLETED, defaultMessage: "Reported" }),
      },
      {
        uuid: FULFILLER_STATUS.EXCEPTION,
        display: intl.formatMessage({ id: "app.labResult.status." + FULFILLER_STATUS.EXCEPTION, defaultMessage: "Not Performed" }),
      },
      {
        uuid: FULFILLER_STATUS.CANCELED_EXPIRED,
        display: intl.formatMessage({ id: "app.labResult.status." + FULFILLER_STATUS.CANCELED, defaultMessage: "Canceled" }) + "/"
        + intl.formatMessage({ id: "app.labResult.status." + FULFILLER_STATUS.EXPIRED, defaultMessage: "Expired" })
      },
    ];

    return (
      <Dropdown
        className="form-filter-group"
        id="test-status-dropdown"
        label={ statusMessage }
        defaultValue= { allMsg }
        input={{ value: testStatusField }}
        list={statusOptions}
        field="testStatusField"
        placeholder={ selectFromListMsg }
        handleSelect={(field, value) => handleFieldChange(field, value)}
      />
    );
  }

  renderTestTypeFilter() {
  /*  const { labTests, handleFieldChange, testTypeField, intl } = this.props;
    const allMsg = intl.formatMessage({ id: "reactcomponents.all", defaultMessage: "All" });
    const selectFromListMsg = intl.formatMessage({ id: "reactcomponents.select.from.list", defaultMessage: "Select from the list" });
    const testTypeMsg = intl.formatMessage({ id: "app.labOrdersListFilters.searchDropdownLabel", defaultMessage: "Test Type" });
    return (
      <Dropdown
        className="form-filter-group"
        id="test-type-dropdown"
        label={ testTypeMsg }
        defaultValue={ allMsg }
        input={{ value: testTypeField }}
        list={labTests}
        field="testTypeField"
        placeholder={ selectFromListMsg }
        handleSelect={(field, value) => handleFieldChange(field, value)}
      />
    );*/
  }

  render() {
    return (
      <div className="order-list-filters">
        <span className="top-filters">
          {this.renderDatePickerFilters()}
        </span>
        <span className="bottom-filters">
          {this.renderNameEMROrOrderIdFilter()}
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
  nameField: "",
};

LabOrderListFilters.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  clearNameEMRField: PropTypes.func.isRequired,
  labTests: PropTypes.array.isRequired,
  nameField: PropTypes.string,
  testStatusField: PropTypes.string.isRequired,
  testTypeField: PropTypes.string.isRequired,
  dateToField: PropTypes.object.isRequired,
  dateFromField: PropTypes.object.isRequired,
};

export default injectIntl(LabOrderListFilters);
