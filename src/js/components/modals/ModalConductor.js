import React, { Component } from 'react';
import {connect} from 'react-redux';

// import the modals that we will be using
import confirmModal from './ConfirmModal.js';
import activateUnlimited from './ActivateUnlimited.js';
const ModalComponents = {
  'CONFIRM': confirmModal,
  'ACTIVATE_UNLIMITED': activateUnlimited
}

const mapStateToProps = (state)=>{
  return {
    modals: state.communication.modalList
  };
}
var mapDispatchToProps = function(dispatch){
  return {

  };
};

class ModalConductor extends Component {
  render() {
    
    // Don't render anything if the modal list is empty
    if(!this.props.modals || this.props.modals.length < 1){ return null;}

    return (
      <div className="modal_conductor">
        {this.props.modals.map((modal, index) => {
          const Component = ModalComponents[modal.type];
          return (
            <Component key={'modal_'+index} modalprops={modal.props} topModal={index === this.props.modals.length -1}/>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalConductor);
