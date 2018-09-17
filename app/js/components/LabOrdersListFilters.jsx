import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  FormControl,
} from 'react-bootstrap';
import { CustomDatePicker as DatePicker, Dropdown } from '@openmrs/react-components';


class LabOrderListFilters extends PureComponent {
  renderNameEMROrOrderIdFilter() {
    const { handleFieldChange, clearNameEMRField, nameField } = this.props;
    return (
      <span className="form-filter-group one-third">
        <span>Search for a sample</span>
        <span className="name-emrid-order-filter">
          <i className="small icon-search" />
          <FormControl
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
    const { handleFieldChange } = this.props;
    return (
      <span className="date-picker-filter">
        <span>
          <DatePicker
            labelClassName="line"
            label="From: "
            defaultDate={moment().subtract(8, 'days')}
            formControlStyle={{
              marginRight: '5px',
              width: '105px',
            }}
            handleDateChange={(field, value) => handleFieldChange(field, value)}
            field="dateFromField"
          />
        </span>
        <span>
          <DatePicker
            labelClassName="line"
            label="To: "
            field="dateToField"
            formControlStyle={{
              marginRight: '5px',
              width: '105px',
            }}
            handleDateChange={(field, value) => handleFieldChange(field, value)}
          />
        </span>
      </span>
    );
  }

  renderTestTypeFilter() {
    const { labTests, handleFieldChange } = this.props;
    return (
      <Dropdown
        className="form-filter-group quater"
        label="Test Type"
        defaultValue="All"
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
          {this.renderTestTypeFilter()}
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
};

export default LabOrderListFilters;
