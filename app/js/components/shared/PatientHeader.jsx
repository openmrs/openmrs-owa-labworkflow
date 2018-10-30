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
import PropTypes from 'prop-types';
import {
  PatientHeader as Header,
} from '@openmrs/react-components';

export class PatientHeader extends PureComponent {
  render() {
    const { patientHeaderDetail } = this.props;
    return (
      <div className="container-fluid">
        {patientHeaderDetail && <Header patient={patientHeaderDetail} />}
      </div>
    );
  }
}


PatientHeader.propTypes = {
  patientHeaderDetail: PropTypes.object.isRequired,
};

const mapStateToProps = ({
  patients,
  selectedPatient,
}) => ({
  patientHeaderDetail: patients[selectedPatient],
});

export default connect(mapStateToProps)(PatientHeader);
