import React, { Component } from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modalActions.js';
import '../../../css/Modals.css';

const mapStateToProps = (state)=>{
  return {
    modals: state.communication.modalList,
    modalBodyText: state.communication.modalBodyText
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    closeModal: () => {dispatch(closeModal());}
  };
};

class ConfirmModal extends Component {
  _cancel(evt){
    this.closing = true;
    this.forceUpdate();
    setTimeout(()=>this.props.closeModal(),400);
  }

  render() {
    return (
      <div className={"modal_overlay" + (this.closing ? " closing" : "")}>
        <div className={"modal"} style={{maxWidth:this.props.modalprops.width || '30rem'}}>
          <header className="modal_header">
            <span>{this.props.modalprops.title}</span>
            <span style={{flex: '1 1 0rem'}}/>
            <svg viewBox="0 0 20 20" className="close_modal" onClick={() => this._cancel()}>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </header>
          <div className="modal_body">
            {this.props.modalprops.body.map((par, index) => 
              <p key={'paragraph_'+index}>{par}</p>
            )}
          </div>
          <div className="modal_footer">
            <div className="button se_button small" onClick={this._cancel.bind(this)}>{this.props.modalprops.cancel || 'CANCEL'}</div>
            {this.props.modalprops.buttons && this.props.modalprops.buttons.map((button, index) =>
              <div key={'button_' + index} className="button se_button small" onClick={()=>{button.action(); this._cancel()}}>{button.name}</div>
            )} 
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ConfirmModal);