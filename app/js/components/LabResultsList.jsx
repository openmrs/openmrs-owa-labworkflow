import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SortableTable, Loader, constantsActions } from '@openmrs/react-components';
import Cell from './LabResultListCells';
import patientAction from '../actions/patientAction';
import "../../css/lab-results-view.scss";


const patientUUID = process.env.NODE_ENV !== 'production'
  ? 'ae62259b-99c4-4262-95ad-65ae5a18d663' // your patient uuid will go here
  : '0c9bbb90-c85d-4a13-b2e6-8fc59f999ca4';


export class LabResultsList extends PureComponent {
  constructor() {
    super();
    this.state = {
      // would need to get this from the route ideally
      // if you're working locally, endeavour to hard code a valid patientUUID on line 12
      patientUUID,
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
      Cell: data => <Cell {...data} columnName={columnName} dateAndTimeFormat={dateAndTimeFormat} type="single" />,
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
            const isPanel = (row.original.encounter)
              && (row.original.encounter.obs)
              && (row.original.encounter.obs.length > 1);
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
                    data={row.original.encounter.obs}
                    columnMetadata={rowColumnMetadata}
                    collapseOnDataChange={false}
                    collapseOnPageChange={false}
                    showPagination={false}
                    defaultPageSize={row.original.encounter.obs.length}
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

    const getPatientLabResults = () => {
      const labResults = orders.map((order) => {
        const status = 'Ordered';
        const matchedEnocunter = encounters.filter((encounter) => {
          const testOrderObs = encounter.obs.filter(item => item.display.includes('Test order number:'));
          const orderNumber = testOrderObs[0].value;
          return orderNumber === order.orderNumber;
        });
        const hasEncounter = !R.isEmpty(matchedEnocunter);
        if (hasEncounter) {
          const encounter = matchedEnocunter[0];
          const hasObs = !R.isEmpty(encounter.obs);
          if (hasObs) {
            
            return {
              order,
              encounter: {
                ...encounter,
                obs: R.pipe(
                  R.filter(item => !item.display.includes('Date of test results')),
                  R.filter(item => !item.display.includes('Location of laboratory')),
                  R.filter(item => !item.display.includes('Test order number')),
                )(encounter.obs),
              },
              status: 'Taken',
            };
          }
          return {
            order,
            encounter: matchedEnocunter[0],
            status: 'Reported',
          };
        }

        return {
          order,
          status,
        };
      });
      return labResults;
    };

    if (!R.isEmpty(selectedPatient) && !R.isEmpty(orders)) {
      const labResults = getPatientLabResults();
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
