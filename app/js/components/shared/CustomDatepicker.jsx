import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

class CustomDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultDate || moment(),
      field: 'dateTo',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { field } = nextProps;
    this.setState({
      field,
    });
  }

  handleChange(date) {
    const { handleDateChange } = this.props;
    const { field } = this.state;
    this.setState({
      selectedDate: date,
    });
    handleDateChange(field, date.format('YYYY-MM-DD'));
  }

  render() {
    const { ...otherProps } = this.props;
    const { selectedDate } = this.state;
    const DateDisplayComponent = ({ onClick, value }) => (
      <span className="date-picker-container">
        <span className={otherProps.labelClassName}>
          {
            otherProps.label
          }
        </span>
        <FormControl
          type="text"
          placeholder=""
          value={value}
        />
        <i className="icon-calendar scale small add-on" role="toolbar" onClick={onClick} />
      </span>
    );
    return (
      <DatePicker
        customInput={<DateDisplayComponent />}
        selected={selectedDate}
        onChange={this.handleChange}
      />
    );
  }
}
CustomDatePicker.defaultProps = {
  labelClassName: '',
  label: '',
  defaultDate: moment(),
  field: '',
};
CustomDatePicker.propTypes = {
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  defaultDate: PropTypes.object,
  handleDateChange: PropTypes.func.isRequired,
  field: PropTypes.string,
};
export default CustomDatePicker;
