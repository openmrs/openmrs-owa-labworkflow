import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { encounterRest } from '@openmrs/react-components';

class LabsStatusDisplay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      encounters: [],
      status: '',
    };

    this.getTestStatus = this.getTestStatus.bind(this);
  }

  async componentWillMount() {
    const {
      conceptUUID, patientUUID,
    } = this.props;
    const encounters = await encounterRest.fetchEncountersByObs(patientUUID, conceptUUID);
    this.setState({ encounters: encounters.results });
  }

  getTestStatus() {
    const { encounters } = this.state;
    const {
      labResultsTestOrderNumberConcept,
      labResultsTestLocationQuestion,
      labResultsDateConcept,
      order,
    } = this.props;
    let statusValue = '';
    let matchedOrder = [];

    const results = encounters.map((encounter) => {
      const testOrderObs = encounter.obs.filter(
        item => item.concept.uuid === labResultsTestOrderNumberConcept,
      );
      const testOrderNumber = testOrderObs[0].value;
      if (order.orderNumber === testOrderNumber) {
        matchedOrder = order;
      }
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
        if (!R.isEmpty(obs)) {
          statusValue = 'Reported';
          return matchedOrder;
        }
        statusValue = 'Taken';
        return matchedOrder;
      }
    });

    const matchedResult = results.filter(item => item.orderNumber === order.orderNumber);
    if (matchedResult.length > 0) {
      statusValue = 'Ordered';
    }
    this.setState({ status: statusValue });
  }

  render() {
    const { status } = this.state;
    this.getTestStatus();

    return (
      <div className="table_cell test-status">
        {status ? <span>{status}</span> : <div className="spiner" />}
      </div>
    );
  }
}

LabsStatusDisplay.propTypes = {
  labResultsTestOrderNumberConcept: PropTypes.string.isRequired,
  labResultsTestLocationQuestion: PropTypes.string.isRequired,
  labResultsDateConcept: PropTypes.string.isRequired,
  order: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  openmrs: {
    CONSTANTS: {
      dateAndTimeFormat,
      labResultsTestOrderNumberConcept,
      labResultsTestLocationQuestion,
      labResultsDateConcept,
    },
  },
}) => ({
  dateAndTimeFormat,
  labResultsTestOrderNumberConcept,
  labResultsTestLocationQuestion,
  labResultsDateConcept,
});

export default connect(mapStateToProps)(LabsStatusDisplay);
