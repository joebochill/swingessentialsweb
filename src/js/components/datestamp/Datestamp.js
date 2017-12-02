import React, { Component } from 'react';

class Datestamp extends Component {
  render() {
    return (
      <div className="datestamp_wrapper">
        <div className="datestamp_divider"/>
        <div className="datestamp">
          <span className="month">{this.props.month}</span>
          <span className="day">{this.props.day}</span>
        </div>
      </div>
    );
  }
}

export default Datestamp;
