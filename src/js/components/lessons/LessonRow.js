import React, { Component } from 'react';
import '../../../css/Lessons.css';
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

class LessonRow extends Component {
  render() {
    return (
      <div className="lesson_row" disabled={this.props.disabled} onClick={()=>this.props.push('/lessons/'+this.props.id)}>
        <span className="lesson_title">{this.props.title}</span>
        <span className={"lesson_extra " + (this.props.new ? "new" : "")}>{this.props.extra}</span>
        <div className="lesson_go" id={this.props.id}>
          <svg height="20px" width="9.98px">
            <path d="M9.89,9.7,4.07,0H0L6,10,0,20H4.07l5.82-9.7A.59.59,0,0,0,9.89,9.7Z"/>
          </svg>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonRow);
