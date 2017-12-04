import React, { Component } from 'react';
import './Datestamp.css';

class Datestamp extends Component {
  constructor(props){
    super(props);
    this.state={
      flipped: false
    }
  }
  render() {
    return (
      <div className="datestamp_wrapper">
        <div className="datestamp_divider"/>
        <div className={"datestamp " + (this.state.flipped?"flipped":"")} onClick={()=>this.setState({flipped:!this.state.flipped})}>
          <div className="card-face front">
            <span className="month">{this.props.month}</span>
            <span className="day">{this.props.day}</span>
          </div>
          <div className="card-face back">
            <span className="year">{this.props.year}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Datestamp;
