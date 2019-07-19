import React, { Component } from 'react';
import '../../../css/Loader.css';

class Loader extends Component {
  render() {
    const style = {
      backgroundColor: this.props.fill,
      width: this.props.size,
      height: this.props.size
    };
    return (
      <div className={"spinner " + (this.props.float ? "float" : "")} style={{ top: this.props.top, right: this.props.right, lineHeight: this.props.size }}>
        <div className="bounce1" style={style}></div>
        <div className="bounce2" style={style}></div>
        <div className="bounce3" style={style}></div>
      </div>
    );
  }
}

export default Loader;
