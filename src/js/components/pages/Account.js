import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import {push, replace} from 'react-router-redux';
import {requestLogout} from '../../actions/actions.js';
//import * as Actions from '../../actions/actions.js';


const mapStateToProps = (state)=>{
  return {
    username: state.userData.username,
    token: state.login.token
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    replace: (val) => {dispatch(replace(val));},
    requestLogout: (un,tok) => {dispatch(requestLogout({username:un,token:tok}))}
  }
};

class AccountPage extends Component {
  componentWillMount(){
    if(!this.props.username){
      this.props.goToSignIn();
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
        this.props.replace('/signin');
    }
  }
  render() {
    return (
      <div>
      <Header/>
      <section className="landing_image image2 center">
        <main className="page_title">
          <h1>Your Account</h1>
          <h3>A Land of Magic and Adventure</h3>
        </main>
      </section>
      <section className="center">
        <div className="button se_button" onClick={()=>this.props.requestLogout(this.props.username,this.props.token)}>
          <span>Sign Out</span>
        </div>
      </section>
      <Footer/>
    </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountPage);
