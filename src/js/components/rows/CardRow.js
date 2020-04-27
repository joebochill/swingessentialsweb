import React, { Component } from 'react';
import '../../../css/Cards.css';
import Loader from '../loader/Loader.js';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';

/* A card row takes a title, value, icon, action, disabled */

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (val) => { dispatch(push(val)) }
  }
}

class CardRow extends Component {
  render() {
    return (
      <a className={"card_row " +
        (this.props.slide ? "slide " : "") +
        (this.props.nohover ? "nohover " : "") +
        (this.props.alternate ? "alternate " : "") +
        (this.props.className ? this.props.className : "")}
        disabled={this.props.disabled}
        href={this.props.href}
        onClick={this.props.action ? (e) => {e.preventDefault(); this.props.action()} : null}
        style={this.props.style}
      >
        {this.props.subtitle ?
          <div className="card_title multi">
            <div>{this.props.title}</div>
            <div>{this.props.subtitle}</div>
          </div> :
          <span className="card_title">{this.props.title}</span>
        }
        <span className={"card_extra"} style={{ color: this.props.specialColor }}>
          {this.props.loading ? (<Loader size=".5rem" fill="rgba(35, 31, 97, .3)" />) : this.props.extra}
        </span>
        {this.props.icon &&
          <div className="card_go">
            {this.props.icon}
          </div>
        }
        {!this.props.icon && this.props.go &&
          <div className="card_go">
            <svg viewBox="0 0 20 20" style={{ height: '1.25rem', width: '.62375rem' }}>
              <path d="M9.89,9.7,4.07,0H0L6,10,0,20H4.07l5.82-9.7A.59.59,0,0,0,9.89,9.7Z" />
            </svg>
          </div>
        }
      </a>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardRow);
