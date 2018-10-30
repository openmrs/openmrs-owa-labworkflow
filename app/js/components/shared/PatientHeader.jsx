/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  PatientHeader as Header,
} from '@openmrs/react-components';

export class PatientHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPatientHeader: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    if (location.pathname === '/labtrends' || location.pathname === '/labresults') {
      this.setState({ showPatientHeader: true });
    } else {
      this.setState({ showPatientHeader: false });
    }
  }

  render() {
    const { patientHeaderDetail } = this.props;
    const { showPatientHeader } = this.state;
    return (
      <div className="container-fluid">
        {showPatientHeader && <Header patient={patientHeaderDetail} />}
      </div>
    );
  }
}


PatientHeader.propTypes = {
  patientHeaderDetail: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({
  patients,
  selectedPatient,
}) => ({
  patientHeaderDetail: patients[selectedPatient],
});

export default withRouter(connect(mapStateToProps)(PatientHeader));
