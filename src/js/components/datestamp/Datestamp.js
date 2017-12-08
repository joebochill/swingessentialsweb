import React, { Component } from 'react';
import '../../../css/Datestamp.css';

class Datestamp extends Component {
  constructor(props){
    super(props);
    this.state={
      flipped: false
    }
  }

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
        <div className={"datestamp " + (this.state.flipped?"flipped":"")} onClick={()=>this.setState({flipped:!this.state.flipped})}>
          <div className="card-face front">
            <span className={"month " + (this.props.monthstamp ? "large":"")}>{date.month}</span>
            {!this.props.monthstamp && <span className="day">{date.day}</span>}
          </div>
          <div className="card-face back">
            <span className="year">{date.year}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Datestamp;
