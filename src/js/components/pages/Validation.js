import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';
import '../../../css/Cards.css';
import {verifyEmail } from '../../actions/RegistrationActions.js';
import { requestLogout } from '../../actions/LoginActions';

const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    pendingRegistration: state.registration.pendingRegistration,
    registrationActivated: state.registration.registrationActivated,
    registrationError: state.registration.registrationError
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    replace: (path) => {dispatch(replace(path))},
    goToSignin: () => {dispatch(replace('/signin'))},
    verifyEmail: (code) => {dispatch(verifyEmail(code))},
    requestLogout: (token) => {dispatch(requestLogout(token))}
  }
};

class ValidationPage extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }
  componentWillMount(){
    window.scrollTo(0,0);
  
    // Make the verification request to the database
    if(this.props.match.params.validation_key){
      if(this.props.token){this.props.requestLogout(this.props.token);}
      this.props.verifyEmail(this.props.match.params.validation_key);
      
    }
    else{
      // This should never happen
      this.props.replace('/');
    }
  }
  componentWillReceiveProps(nextProps){

  }


  render() {
    let regError = this.props.registrationError;
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>Account Verification</h1>
            <h3>Confirm Your Email</h3>
          </main>
        </section>
        <div>
          {this.props.pendingRegistration && 
            <section>
              <Loader/>
            </section>
          }
          {this.props.registrationActivated && !regError &&
            <section>
              <h1>Thank You,</h1>
              <p>Your email address has been confirmed.<br/>Please <a onClick={()=>this.props.goToSignin()}>Sign In</a> to view your account.</p>
            </section>
          }
          {regError === 400302 &&
            <section>
              <h1>Oops,</h1>
              <p>Your verification link is invalid.<br/>Please check your registration email and try again. If you continue to have problems, please CONTACT US.</p>
            </section>
          }
          {regError === 400303 &&
            <section>
              <h1>Oops,</h1>
              <p>Your verification link has expired.<br/>Click below to request a new link.</p>
            </section>
          }
          {regError === 400304 &&
            <section>
              <h1>Oops,</h1>
              <p>Your your email address has already been verified.<br/>Click below to go to your account.</p>
            </section>
          }
          {regError && regError !== 400302 && regError !== 400303 && regError !== 400304 &&
            <section>
              <h1>Oops,</h1>
              <p>There was an error verifying your email address.<br/>Please try again later.</p>
            </section>
          }
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ValidationPage);
