/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';

import LabOrdersList from './LabOrdersList';

export class App extends React.Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(patientAction.getPatient('da5e210f-a3c4-4c49-80f2-e2e5386db8ad'));
    // dispatch(patientAction.getPatient('da5e210f-a3c4-4c49-80f2-e2e5386db8ad'));
    // dispatch(patientAction.getPatient('da5e210f-a3c4-4c49-80f2-e2e5386db8ad'));
  }

  render() {
    return (
      <div>

        <LabOrdersList />
      </div>
    );
  }
}

export default App;