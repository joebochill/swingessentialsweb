import React, { Component } from 'react';
import Row from './CardRow.js';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (val) => { dispatch(push(val)) }
  }
}

class LessonRow extends Component {
  render() {
    return (
      <Row
        className={"noflex"}
        disabled={this.props.disabled}
        title={this.props.title}
        extra={this.props.extra}
        action={() => this.props.push('/lessons/' + this.props.id)}
        specialColor={this.props.new ? "#F30000" : null}
        go
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonRow);
