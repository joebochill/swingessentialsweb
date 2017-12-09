import React, { Component } from 'react';
import Row from './CardRow.js';

class Placeholder extends Component {
  render() {
    return (
      <Row 
        disabled={true}
        title={this.props.message}
        loading={this.props.loading}
      />
    );
  }
}

export default Placeholder;
