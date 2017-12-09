import React, { Component } from 'react';
import Row from './CardRow.js';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';


const mapStateToProps = (state)=>{
    return {

    };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    push: (val) => {dispatch(push(val))}
  }
}

class SettingRow extends Component {
  render() {
    return (
      <Row 
        disabled={this.props.disabled}
        title={this.props.title}
        extra={this.props.extra}
        action={this.props.editing ? ()=>this.props.push('/lessons/'+this.props.id)}
        icon={<svg height="20px" width="9.98px">
               <path d="M9.89,9.7,4.07,0H0L6,10,0,20H4.07l5.82-9.7A.59.59,0,0,0,9.89,9.7Z"/>
             </svg>}
      />
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingRow);
