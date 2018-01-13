import React, { Component } from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modalActions.js';
import '../../../css/Modals.css';
import { activateUnlimited } from '../../actions/LessonActions';

const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    modals: state.communication.modalList,
    modalBodyText: state.communication.modalBodyText
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    closeModal: () => {dispatch(closeModal());},
    activateUnlimited: (token) => {dispatch(activateUnlimited(token))}
  };
};

class ActivateUnlimitedModal extends Component {
  _cancel(evt){
    this.props.closeModal();
  }

  _okay(evt){
    if(this.props.token){
      this.props.activateUnlimited(this.props.token);
    }
    this._cancel(evt);
  }

  render() {
    return (
      <div className={"modal_overlay" + (this.props.topModal ? " topModal" : "")}>
        <div className="modal" style={{maxWidth:'30rem'}}>
          <header className="modal_header">
            <span>Activate Unlimited</span>
            <span style={{flex: '1 1 0rem'}}/>
            <svg viewBox="0 0 20 20" className="close_modal" onClick={this._cancel.bind(this)}>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </header>
          <div className="modal_body">
            <p>Activating your unlimited lessons deal will give you access to unlimited lessons for 30 days. The clock starts when you click Activate.</p>
            <p>Would you like to proceed?</p>
          </div>
          <div className="modal_footer">
            <div className="button se_button small" onClick={this._cancel.bind(this)}>CANCEL</div>
            <div className="button se_button small" onClick={this._okay.bind(this)}>ACTIVATE</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivateUnlimitedModal);