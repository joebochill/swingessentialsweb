import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions.js';
import '../../../css/Modals.css';

const mapStateToProps = (state) => {
  return {
    token: state.login.token
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    closeModal: () => { dispatch(closeModal()); }
  };
};

class PendingSwingModal extends Component {
  _cancel(evt) {
    this.closing = true;
    this.forceUpdate();
    setTimeout(() => this.props.closeModal(), 400);
  }

  render() {
    return (
      <div className={"modal_overlay" + (this.closing ? " closing" : "")}>
        <div className="modal" style={{ maxWidth: '30rem' }}>
          <header className="modal_header">
            <span>Pending Swing</span>
            <span style={{ flex: '1 1 0rem' }} />
            <svg viewBox="0 0 20 20" className="close_modal" onClick={this._cancel.bind(this)}>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </header>
          <div className="modal_body">
            <p>You already have a swing analysis in progress. Please wait for that analysis to finish before submitting a new swing.</p>
            <p>We guarantee a 48-hour turnaround on all lessons.</p>
          </div>
          <div className="modal_footer">
            <div className="button se_button small" onClick={this._cancel.bind(this)}>OK</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingSwingModal);