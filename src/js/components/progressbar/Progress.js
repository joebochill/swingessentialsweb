import React, { Component } from 'react';
import '../../../css/Loader.css';

class Progress extends Component {
  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <div className={"progress_wrapper " + (this.props.infinite ? "infinite" : "")}>
          <div className="progress_inner" style={{ width: this.props.infinite ? '100%' : this.props.progress + '%' }}>
            <div class_name="progress_glow" />
          </div>
        </div>
        {this.props.label && <span style={{ display: 'block', marginTop: '0.5rem' }}>{this.props.label}</span>}
      </div>
    );
  }
}

export default Progress;
