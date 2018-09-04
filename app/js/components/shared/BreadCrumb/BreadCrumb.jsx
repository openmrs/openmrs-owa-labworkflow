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
      currentTab: '',
    };
  }

  componentWillMount() {
    const { history } = this.props;
    history.listen((location) => {
      const currentTab = location.pathname.split('/').pop();
      this.setState({
        currentTab,
      });
    });
  }


  render() {
    const {
      currentTab,
    } = this.state;
    let outputBreadcrumb;

    const homePageBreadcrumb = (
      <Link to="/">
        <span
          className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
          aria-hidden="true" />
        <span className="title breadcrumb-item">
          <u>Lab workflow</u>
        </span>
      </Link>
    );

    switch (currentTab) {
      case 'FakeBreadcrumbPage':
        outputBreadcrumb = (
          <span>
            <span>{ homePageBreadcrumb }</span>
            <Link to="FakeBreadcrumbPage">
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                <u>FakeBreadcrumbPage</u>
              </span>
            </Link>
          </span>
        );
        break;

      default:
        outputBreadcrumb = homePageBreadcrumb;
    }

    return (
      <div className="breadcrumb">
        <a href="../../" className="breadcrumb-item">
          <span className="glyphicon glyphicon-home breadcrumb-item" aria-hidden="true" />
        </a>
        { outputBreadcrumb }
      </div>
    );
  }
}

BreadCrumb.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default withRouter(BreadCrumb);
