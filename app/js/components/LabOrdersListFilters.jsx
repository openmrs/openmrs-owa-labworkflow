import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  FormControl,
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { CustomDatePicker as DatePicker, Dropdown } from '@openmrs/react-components';

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
    const { handleFieldChange, dateFromField, dateToField } = this.props;
    return (
      <span className="date-picker-filter">
        <span>
          <DatePicker
            labelClassName="line"
            label={(
              <FormattedMessage
                id="app.labOrdersListFilters.searchDateFromLabel"
                defaultMessage="From: "
                description="Label for the first date search input" />
            )}
            defaultDate={dateFromField.format('YYYY-MM-DD') || moment().subtract(8, 'days').format()}
            handleDateChange={(field, value) => handleFieldChange(field, value)}
            field="dateFromField"
          />
        </span>
        <span>
          <DatePicker
            labelClassName="line"
            label={(
              <FormattedMessage
                id="app.labOrdersListFilters.searchDateToLabel"
                defaultMessage="To: "
                description="Label for the second date search input" />
            )}
            defaultDate={dateToField.format('YYYY-MM-DD') || moment().format()}
            field="dateToField"
            handleDateChange={(field, value) => handleFieldChange(field, value)}
          />
        </span>
      </span>
    );
  }

  renderTestStatusFilter() {
    const { handleFieldChange, testStatusField } = this.props;
    const statusOptions = ["Ordered", "Reported", "Taken"];
    return (
      <Dropdown
        className="form-filter-group"
        label={(
          <FormattedMessage
            id="app.labOrdersListFilters.statusDropdownLabel"
            defaultMessage="Status"
            description="Label for the test status dropdown" />
        )}
        defaultValue="All"
        input={{ value: testStatusField }}
        list={statusOptions}
        field="testStatusField"
        handleSelect={(field, value) => handleFieldChange(field, value)}
      />
    );
  }

  renderTestTypeFilter() {
    const { labTests, handleFieldChange, testTypeField } = this.props;
    return (
      <Dropdown
        className="form-filter-group"
        label={(
          <FormattedMessage
            id="app.labOrdersListFilters.searchDropdownLabel"
            defaultMessage="Test Type"
            description="Label for the test type dropdown" />
        )}
        defaultValue="All"
        input={{ value: testTypeField }}
        list={labTests}
        field="testTypeField"
        handleSelect={(field, value) => handleFieldChange(field, value)}
      />
    );
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

export default LabOrderListFilters;
