import React, { Component } from 'react';
import Loader from '../loader/Loader.js';
import '../../../css/Lessons.css';

class Placeholder extends Component {
  render() {
    return (
      <div className="lesson_row" disabled>
        <span className="lesson_title">{this.props.message}</span>
        {this.props.loading && <span className={"lesson_extra"}><Loader size=".5rem" fill="rgba(35, 31, 97, .3)"/></span>}
      </div>
    );
  }
}

export default Placeholder;
