import React, { PureComponent } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';


// TODO delete
class EncounterDisplay extends PureComponent {
  render() {
    const {
      order: {
        labResult = null,
      },
      type,
      intl,
    } = this.props;

    if (!R.isNil(labResult)) {
      if (type === "status") {
        const statusMsgId = "app.labResult.status." + labResult.resultStatus.toLowerCase();
        return (
          <span>
            { intl.formatMessage({ id: statusMsgId, defaultMessage: labResult.resultStatus }) }
          </span>
        );
      }

      if (type === "collectionDate") {
        const statusesWithoutEncounter = ["Ordered", "Canceled", "Expired"];
        if (!statusesWithoutEncounter.includes(labResult.resultStatus)) {
          return (
            <div className="table_cell test-type">
              { R.path(['encounter', 'encounterDatetime'], labResult) ? moment(labResult.encounter.encounterDatetime).format("DD-MMM-YYYY") : ""}
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

export default connect(mapStateToProps)(injectIntl(EncounterDisplay));
