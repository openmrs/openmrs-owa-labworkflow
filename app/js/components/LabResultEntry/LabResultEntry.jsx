/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import { CustomDatePicker, Dropdown } from '@openmrs/react-components';
import './LabResultEntry.scss';

export class LabResultEntry extends PureComponent {
  saveEncounter = async () => {
    const { history } = this.props;
    const saveEncounter = await swal("Are you sure you want to save this encounter ?", {
      buttons: {
        YES: "YES",
        NO: 'NO',
      },
    });
    if (saveEncounter === "YES") {
      swal("This encounter has been saved!", {
        icon: "success",
      }).then(() => history.push('/'));
    }
  }

  render() {
    const mockData = [{
      name: 'Hematocrit',
      value: 48,
      measurement: '%',
      range: '45% - 53%',
    }, {
      name: 'Platcelets',
      value: 524000,
      measurement: '10**3/mL',
      range: '150,000 - 450,000',
    }, {
      name: 'Hematocrit',
      value: 0,
      measurement: '10`3/uL',
      range: '4,500 - 11,00',
    },
    ];
    return (
      <div className="container-fluid">
        <h1>Test Results</h1>
        <div className="fieldset-container">
          <fieldset>
            <legend>Specimen Details:</legend>
            <div className="col-xs-12">
              <CustomDatePicker
                labelClassName="line"
                label="Speciemen Collection Date "
                defaultDate={moment().subtract(7, 'days')}
                field="dateFromField"
              />
            </div>
            <br />
            <br />
            <div className="col-xs-6">
              <span>
                Test:&nbsp;
                <span className="test-details">Hemogram</span>
              </span>
            </div>
            <div className="col-xs-6">
              <span>
                Urgency:&nbsp;
                <span className="test-details">Routine</span>
              </span>
            </div>
            <br />
            <br />
          </fieldset>
        </div>
        <br />
        <br />
        <br />
        <div className="fieldset-container">
          <fieldset>
            <legend>Result Details:</legend>
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-4">
                  <span className="date-picker-filter">
                    <CustomDatePicker
                      labelClassName="line"
                      label="Result Date "
                      defaultDate={moment().subtract(7, 'days')}
                      field="dateFromField"
                    />
                  </span>
                </div>
                <div className="col-xs-4">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value="" />
                        Did not perform
                    </label>
                  </div>
                </div>
                <div className="col-xs-4">
                  <Dropdown
                    className="form-filter-group quater"
                    label="Reason:"
                    labelClassName="filter-label"
                    defaultValue="All"
                    list={[1, 3, 4, 5]}
                    field="testTypeField"
                    // handleSelect={(field, value) => handleFieldChange(field, value)}
                  />
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-xs-6">
                  <div className="col-xs-offset-8">
                    &nbsp;&nbsp;&nbsp;
                    <u>normal range</u>
                  </div>
                </div>
                <br />
              </div>
              {mockData && mockData.map(data => (
                <div key={data.value}>
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="col-xs-3">
                        <span>
                          {data.name}
                          &nbsp;
                        </span>
                      </div>
                      <div className="col-xs-5">
                        <input type="text" value={data.value} className="result-input" />
                        <span>
                          &nbsp;
                          {data.measurement}
                        </span>
                      </div>
                      <div className="col-xs-4">
                        <span className="result-detail-range">{data.range}</span>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <br />
        <button type="reset" className="cancel">
          <Link to="/" className="link-cancel">Cancel</Link>
        </button>
        <button type="submit" className="pull-right btn-success" onClick={this.saveEncounter}>
          Submit
        </button>
      </div>
    );
  }
}

LabResultEntry.propTypes = {
};

export default LabResultEntry;
