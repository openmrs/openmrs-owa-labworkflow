import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SortableTable, Loader, constantsActions } from '@openmrs/react-components';
import RangeCell from './RangeCell';
import patientAction from '../actions/patientAction';
import "../../css/lab-results-view.scss";


export const Cell = ({ columnName, value, dateAndTimeFormat }) => {
  const isPanel = value.obs.length > 1;

  if (columnName === 'TYPE') {
    return (
      <div className="table_cell type">
        <span>{value.order.display}</span>
      </div>
    );
  }

  if (columnName === 'REQUEST DATE') {
    return (
      <div className="table_cell request-date">
        <span>{moment(value.order.dateActivated).format("DD-MMM-YYYY")}</span>
      </div>
    );
  }

  if (columnName === 'STATUS') {
    return (
      <div className="table_cell status">
        <span>Reported</span>
      </div>
    );
  }

  if (columnName === 'SAMPLE DATE') {
    return (
      <div className="table_cell sample-date">
        <span>{moment(value.encouterDatetime).format("DD-MMM-YYYY")}</span>
      </div>
    );
  }

  if (!isPanel) {
    const labResult = value.obs[0];
    switch (columnName) {
      case 'RESULT':
        return (
          <div className="table_cell result">
            <span>{labResult.value.display}</span>
          </div>
        );
      case 'NORMAL RANGE':
        return (
          <RangeCell conceptUUID={labResult.concept.uuid} />
        );
      default:
        return null;
    }
  }
  return null;
};

export const CollapsibleCell = ({ columnName, value }) => {
  switch (columnName) {
    case 'TYPE': {
      return (
        <div className="table_cell type">
          <span>{value.concept.display}</span>
        </div>
      );
    }
    case 'RESULT':
      return (
        <div className="table_cell result">
          <span>{value.value}</span>
        </div>
      );
    case 'NORMAL RANGE':
      return (
        <RangeCell conceptUUID={value.concept.uuid} />
      );
    default:
      return null;
  }
};


export class LabResultsList extends PureComponent {
  constructor() {
    super();
    this.state = {
      // would need to get this from the route
      patientUUID: '49287a9d-256b-4f52-9a92-ec61f9166f25',
    };
  }


  componentWillMount() {
    const { dispatch } = this.props;
    const { patientUUID } = this.state;
    dispatch(constantsActions.getDateAndTimeFormat());
    dispatch(patientAction.getPatient(patientUUID));
    dispatch(patientAction.fetchPatientLabTestResults(patientUUID));
  }

  renderLabResultsTable(labResults) {
    const { dateAndTimeFormat } = this.props;
    const fields = ["TYPE", "STATUS", "REQUEST DATE", "SAMPLE DATE", "RESULT", "NORMAL RANGE"];

    const columnMetadata = fields.map(columnName => ({
      Header:
  <span className={`labs-result-table-head-${columnName.replace(' ', '-').toLocaleLowerCase()}`}>
    {columnName}
  </span>,
      accessor: "",
      Cell: data => <Cell {...data} columnName={columnName} dateAndTimeFormat={dateAndTimeFormat} />,
      className: `lab-results-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `lab-result-list-header-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));
    return (
      <div className="lab-results-list">
        <SortableTable
          data={labResults}
          columnMetadata={columnMetadata}
          filteredFields={fields}
          filterType="none"
          showFilter={false}
          isSortable={false}
          rowOnClick={this.handleShowResultsEntryPage}
          noDataMessage="No orders found"
          defaultPageSize={10}
          subComponent={(row) => {
            const isPanel = row.original.obs.length > 1;
            const rowFields = ["TYPE", "RESULT", "NORMAL RANGE"];
            const rowColumnMetadata = rowFields.map(columnName => ({
              accessor: "",
              Cell: data => <CollapsibleCell {...data} columnName={columnName} />,
              className: `lab-results-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
              headerClassName: 'lab-results-list-header',
            }));
            if (isPanel) {
              return (
                <div className="collapsible-panel">
                  <SortableTable
                    data={row.original.obs}
                    columnMetadata={rowColumnMetadata}
                    collapseOnDataChange={false}
                    collapseOnPageChange={false}
                    showPagination={false}
                    defaultPageSize={row.original.obs.length}
                    defaultClassName=""
                  />
                </div>
              );
            }
            return '';
          }}
        />
      </div>
    );
  }

  render() {
    const { patients } = this.props;
    const { patientUUID } = this.state;
    const selectedPatient = patients[patientUUID] || {};
    const { encounters = [], orders = [] } = selectedPatient;

    const getPatientLabResults = (patient) => {
      const labResults = encounters.map((encounter) => {
        const testOrderObs = encounter.obs.filter(item => item.display.includes('Test order number:'));
        const orderNumber = testOrderObs[0].value;
        const order = patient.orders.filter(item => item.orderNumber === orderNumber)[0];
        const validObs = encounter.obs.filter(item => !item.display.includes('Test order number:'));
        return { ...encounter, obs: validObs, order };
      });
      return labResults.filter(result => !R.isEmpty(result.obs));
    };

    if (!R.isEmpty(selectedPatient) && !R.isEmpty(orders) && !R.isEmpty(encounters)) {
      const labResults = getPatientLabResults(patients[patientUUID]);
      return (
        <div className="main-container">
          <h2>
            Lab Test Results
          </h2>

          <React.Fragment>
            {this.renderLabResultsTable(labResults)}
          </React.Fragment>
        </div>
      );
    }
    return (
      <Loader />
    );
  }
}

LabResultsList.propTypes = {
  obs: PropTypes.array.isRequired,
  labTests: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dateAndTimeFormat: PropTypes.string.isRequired,
};

export const mapStateToProps = ({
  openmrs: { CONSTANTS: { dateAndTimeFormat } },
  patients,
}) => ({
  patients,
  dateAndTimeFormat,
});


export default connect(mapStateToProps)(LabResultsList);
