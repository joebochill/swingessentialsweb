import React, { Component } from 'react';
import '../../../css/Modals.css';

class BaseModal extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     flipped: false
  //   }
  // }

  render() {
    const date = this._getDatePieces();
    return (
      <div className="modal_overlay">
        <div className="modal">
          <div className="modal_header">
          </div>
          <div className="modal_body">
          </div>
          <div className="modal_footer">
          </div>
        </div>
      </div>
    );
  }
}

export default Datestamp;
