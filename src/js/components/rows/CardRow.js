import React, { Component } from 'react';
import '../../../css/Cards.css';
import Loader from '../loader/Loader.js';

import {push} from 'react-router-redux';
import {connect} from 'react-redux';

/* A card row takes a title, value, icon, action, disabled */

const mapStateToProps = (state)=>{
    return {

    };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    push: (val) => {dispatch(push(val))}
  }
}

class CardRow extends Component {
  render() {
    return (
      <div className={"card_row " + 
        (this.props.slide ? "slide " : "") + 
        (this.props.nohover ? "nohover " : "") + 
        (this.props.alternate ? "alternate " : "")} disabled={this.props.disabled} onClick={this.props.action ? ()=>this.props.action() : null}>
        <span className="card_title">{this.props.title}</span>
        <span className={"card_extra"} style={{color: this.props.specialColor}}>
        {this.props.loading ? (<Loader size=".5rem" fill="rgba(35, 31, 97, .3)"/>) : this.props.extra}
        </span>
        {this.props.icon && 
          <div className="card_go">
            {this.props.icon}
          </div>
        }
        {!this.props.icon && this.props.go && 
          <div className="card_go">
            <svg height="20px" width="9.98px">
              <path d="M9.89,9.7,4.07,0H0L6,10,0,20H4.07l5.82-9.7A.59.59,0,0,0,9.89,9.7Z"/>
            </svg>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardRow);
