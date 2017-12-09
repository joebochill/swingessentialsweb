import React, { Component } from 'react';
import '../../../css/Datestamp.css';

class Datestamp extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     flipped: false
  //   }
  // }

  _getDatePieces(){
    let parts = this.props.datestamp.split('-');
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return {month:months[parseInt(parts[1],10)-1], day:parts[2], year:parts[0]};
  }

  render() {
    const date = this._getDatePieces();
    return (
      <div className="datestamp_wrapper">
        <div className="datestamp_divider"/>
        <div className="datestamp">
          <span className="month">{date.month}</span>
          <span className="day">{date.day}</span>
          <span className="year">{date.year}</span>
        </div>
      </div>
    );
  }
}

export default Datestamp;
