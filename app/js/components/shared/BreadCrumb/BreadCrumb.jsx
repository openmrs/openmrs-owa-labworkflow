/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './breadCrumb.css';

class BreadCrumb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homePage: false,
      FakeBreadcrumbPage: false,
    };
  }

  componentWillMount() {
    const { history } = this.props;
    history.listen((location) => {
      console.log('----', location);
      const currentTab = location.pathname.split('/').pop();
      if (!currentTab) {
        this.setState(() => ({
          homePage: true,
          FakeBreadcrumbPage: false,
        }));
      } else if (currentTab === 'FakeBreadcrumbPage') {
        this.setState(() => ({
          FakeBreadcrumbPage: true,
          homePage: false,
        }));
      }
    });
  }

  render() {
    const {
      homePage,
      FakeBreadcrumbPage,
    } = this.state;

    return (
      <div className="breadcrumb">
        <a href="../../" className="breadcrumb-item">
          <span className="glyphicon glyphicon-home breadcrumb-item" aria-hidden="true" />
        </a>
        {
          FakeBreadcrumbPage
            ? (
              <Link to="/">
                <span
                  className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                  aria-hidden="true" />
                <span className="title breadcrumb-item">
                  <u>Lab workflow</u>
                </span>
              </Link>
            )
            : (
              <Link to="/">
                <span
                  className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                  aria-hidden="true" />
                <span className="title breadcrumb-item">
                  <strong>Lab workflow</strong>
                </span>
              </Link>
            )
        }
        {
          FakeBreadcrumbPage
          && (
            <Link to="FakeBreadcrumbPage">
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                <u>FakeBreadcrumbPage</u>
              </span>
            </Link>
          )
        }
      </div>
    );
  }
}

BreadCrumb.propTypes = {
  history: PropTypes.func.isRequired,
};
export default withRouter(BreadCrumb);
