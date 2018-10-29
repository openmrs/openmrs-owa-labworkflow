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

import patientAction from '../../actions/patientAction';

const patientUUID = process.env.NODE_ENV !== 'production'
  ? '70c9de3d-ce33-420b-818b-332acbfaf776' // your patient uuid will go here
  : 'd61f8c9d-a2c7-464d-9747-d241fad1eb51';
export class PatientHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patientHeaderDetail: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(patientAction.getPatient(patientUUID));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      patientHeaderDetail: nextProps.patientHeaderDetail,
    });
  }

  render() {
    const { patientHeaderDetail } = this.state;
    return (
      <div className="container-fluid">
        {patientHeaderDetail && <Header patient={patientHeaderDetail} />}
      </div>
    );
  }
}


PatientHeader.propTypes = {
  patientHeaderDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    patient: { patient },
  } = state;

  return {
    patientHeaderDetail: patient,
  };
};

export default connect(mapStateToProps)(PatientHeader);
