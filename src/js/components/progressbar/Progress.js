import React, { Component } from 'react';

class Progress extends Component {
  render() {
    // const style={
    //   backgroundColor: this.props.fill,
    //   width: this.props.size,
    //   height: this.props.size
    // };
    return (
      <div style={{height: '1rem', width: '100%', border:'0.0625rem solid #231f61'}}>
        <div style={{background: '#231f61', height:'100%', width: this.props.progress + '%'}}/>
      </div>
    );
  }
}

export default Progress;
