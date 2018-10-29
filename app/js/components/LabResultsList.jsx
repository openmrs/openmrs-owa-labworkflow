import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SortableTable, Loader, constantsActions, PatientHeader } from '@openmrs/react-components';
import moment from 'moment';
import RangeCell from './RangeCell';
import patientAction from '../actions/patientAction';
import "../../css/lab-results-view.scss";


const patientUUID = process.env.NODE_ENV !== 'production'
  ? 'b2231edd-f62b-47fc-a9c7-feb49c63721c' // your patient uuid will go here
  : 'd61f8c9d-a2c7-464d-9747-d241fad1eb51';

const Cell = ({ value, columnName, type }) => {
  if (type === 'single') {
    const hasNoEncounter = value.status === 'Ordered';
    const isPanel = value.order.concept.set;
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
          <span>{value.status}</span>
        </div>
      );
    }

    if (columnName === 'SAMPLE DATE' && !hasNoEncounter) {
      return (
        <div className="table_cell sample-date">
          <span>{moment(value.encounter.encouterDatetime).format("DD-MMM-YYYY") || ''}</span>
        </div>
      );
    }

    if (!isPanel && !hasNoEncounter) {
      const labResult = value.encounter.obs[0];

      switch (columnName) {
        case 'RESULT':
          return (
            <div className="table_cell result">
              <span>{labResult.value.display || labResult.value}</span>
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
  }
  if (type === 'panel') {
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
            <span>{value.value.display || value.value}</span>
          </div>
        );
      case 'NORMAL RANGE':
        return (
          <RangeCell conceptUUID={value.concept.uuid} />
        );

      default: {
        return null;
      }
    }
  }
  return (
    <div className="spiner" />
  );
};

Cell.propTypes = {
  columnName: PropTypes.string.isRequired,
  value: PropTypes.shape({}).isRequired,
};

export class LabResultsList extends PureComponent {
  constructor() {
    super();
    this.state = {
      // would need to get this from the route ideally
      // if you're working locally, endeavour to hard code a valid patientUUID on line 12
      patientUUID,
    };

    this.handleShowLabTrendsPage = this.handleShowLabTrendsPage.bind(this);
  }


  componentWillMount() {
    const { dispatch } = this.props;
    const { patientUUID } = this.state;
    dispatch(constantsActions.fetchLabResultsDateConcept());
    dispatch(constantsActions.fetchLabResultsTestOrderNumberConcept());
    dispatch(constantsActions.fetchLabResultsTestLocationQuestion());
    dispatch(constantsActions.getDateAndTimeFormat());
    dispatch(patientAction.getPatient(patientUUID));
    dispatch(patientAction.fetchPatientLabTestResults(patientUUID));
  }

  handleShowLabTrendsPage(data) {
    const { history } = this.props;
    if (data.order) {
      history.push({
        pathname: "/labtrendspage",
        state: data.encounter.obs[0].concept,
      });
    } else if (data.concept) {
      history.push({
        pathname: "/labtrendspage",
        state: data.concept,
      });
    }
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
      Cell: data => <Cell {...data} columnName={columnName} dateAndTimeFormat={dateAndTimeFormat} type="single" show={false} />,
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
          // rowOnClick={this.handleShowLabTrendsPage}
          isSortable={false}
          noDataMessage="No orders found"
          defaultPageSize={10}
          subComponent={(row) => {
            const isPanel = (row.original.order.concept.set) && (row.original.status !== "Ordered");
            const rowFields = ["TYPE", "RESULT", "NORMAL RANGE"];
            const rowColumnMetadata = rowFields.map(columnName => ({
              accessor: "",
              Cell: data => <Cell {...data} columnName={columnName} type="panel" />,
              className: `lab-results-list-cell-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
              headerClassName: 'lab-results-list-header',
            }));
            if (isPanel) {
              return (
                <div className="collapsible-panel">
                  <SortableTable
                    data={row.original.encounter.obs[0].groupMembers}
                    columnMetadata={rowColumnMetadata}
                    collapseOnDataChange={false}
                    collapseOnPageChange={false}
                    showPagination={false}
                    rowOnClick={this.handleShowLabTrendsPage}
                    defaultPageSize={row.original.encounter.obs[0].groupMembers.length}
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
    const {
      patients,
      labResultsTestOrderNumberConcept,
      labResultsTestLocationQuestion,
      labResultsDateConcept,
    } = this.props;
    const { patientUUID } = this.state;
    const selectedPatient = patients[patientUUID] || {};
    const { encounters = [], orders = [] } = selectedPatient;

    const getPatientLabResults = () => {
      const results = encounters.map((encounter) => {
        const testOrderObs = encounter.obs.filter(
          item => item.concept.uuid === labResultsTestOrderNumberConcept,
        );
        const testOrderNumber = testOrderObs[0].value;
        const matchedOrder = orders.filter(order => order.orderNumber === testOrderNumber);
        const hasObs = !R.isEmpty(encounter.obs);
        const concealedConceptUUIDs = [
          labResultsTestOrderNumberConcept,
          labResultsTestLocationQuestion,
          labResultsDateConcept,
        ];
        if (hasObs) {
          const obs = R.pipe(
            R.filter(item => !concealedConceptUUIDs.includes(item.concept.uuid)),
          )(encounter.obs);
          if (!R.isEmpty(encounter.obs)) {
            return {
              order: matchedOrder[0],
              encounter: {
                ...encounter,
                obs,
              },
              status: 'Taken',
            };
          }

          return {
            order: matchedOrder[0],
            encounter: {
              ...encounter,
              obs,
            },
            status: 'Reported',
          };
        }
      });

      const filteredOrders = orders.filter((order) => {
        const matchedResult = results.filter(item => item.order.orderNumber === order.orderNumber);
        return R.isEmpty(matchedResult);
      });

      const orderedTests = filteredOrders.map(order => ({
        order,
        status: 'Ordered',
      }));
      const labResults = results.concat(orderedTests);

      return labResults;
    };

    if (!R.isEmpty(selectedPatient) && !R.isEmpty(orders)) {
      const labResults = getPatientLabResults();
      return (
        <div className="main-container">
          <PatientHeader patient={selectedPatient} />
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
  dateAndTimeFormat: PropTypes.string.isRequired,
};

export const mapStateToProps = ({
  openmrs: {
    CONSTANTS: {
      dateAndTimeFormat,
      labResultsTestOrderNumberConcept,
      labResultsTestLocationQuestion,
      labResultsDateConcept,
    },
  },
  patients,
}) => ({
  patients,
  dateAndTimeFormat,
  labResultsTestOrderNumberConcept,
  labResultsTestLocationQuestion,
  labResultsDateConcept,
});

export default connect(mapStateToProps)(LabResultsList);
