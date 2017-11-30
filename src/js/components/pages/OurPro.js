import React, { Component } from 'react';
import {connect} from 'react-redux';
//import * as Actions from '../../actions/actions.js';


// const mapStateToProps = (state)=>{
//     return {

//     };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: () => {
//       dispatch({type:"TEST"})
//     }
//   }
// }
// var mapDispatchToProps = function(dispatch){
//   return {
//       test: function(){ dispatch(Actions.loginSuccess); }
//   }
// };
class OurProPage extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="button se_button" 
            //onClick={()=>this.props.dispatch(Actions.loginSuccess())}
      >
      </div>
    );
  }
}

export default connect()(OurProPage);
