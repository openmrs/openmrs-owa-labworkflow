import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';


class EncounterDisplay extends PureComponent {
  render() {
    const {
      order: {
        labResult = null,
      },
      type,
    } = this.props;

    if (!R.isNil(labResult)) {
      if (type === "status") {
        return (
          <span>
            {labResult.resultStatus}
          </span>
        );
      }

      if (type === "collectionDate") {
        const statusesWithoutEncounter = ["Ordered", "Cancelled", "Expired"];
        if (!statusesWithoutEncounter.includes(labResult.resultStatus)) {
          return (
            <div className="table_cell test-type">
              {moment(labResult.encounter.encounterDatetime).format("DD-MMM-YYYY")}
            </div>
          );
        }
        return null;
      }
    }

    return (
      <div className="spiner" />
    );
  }
}

EncounterDisplay.propTypes = {
  order: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  labOrders: { orders },
}, {
  orderUUID,
}) => ({
  order: orders.find(item => item.uuid === orderUUID),
});

export default connect(mapStateToProps)(EncounterDisplay);
