import React, { PureComponent } from 'react';


class LabResultEntry extends PureComponent {
  render() {
    const { location } = this.props;
    const { patient } = location.state;
    const displayText = `Lab Results for ${patient.display}`;
    return (
      <div>
        <h1>{displayText}</h1>
      </div>
    )
  }
}

export default LabResultEntry;