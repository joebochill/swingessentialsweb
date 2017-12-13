import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
// import {/*requestLogout, */setTargetRoute, validatePassword, updateUserCredentials} from '../../actions/actions.js';
// import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
// import {createAccount} from '../../actions/actions.js';
import Loader from '../loader/Loader.js';
import '../../../css/Cards.css';
import { /*requestLogout, */verifyEmail } from '../../actions/actions';
// import '../../../css/Buttons.css';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    pendingRegistration: state.login.pendingRegistration,
    registrationActivated: state.login.registrationActivated,
    registrationError: state.login.registrationError
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    // createAccount: (data) => {dispatch(createAccount(data))},
    replace: (path) => {dispatch(replace(path))},
    // requestLogout: (token) => {dispatch(requestLogout(token))},
    verifyEmail: (code) => {dispatch(verifyEmail(code))}
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
              <p>Your email address has been confirmed.<br/>Please Sign In to view you account.</p>
            </section>
          }
          {regError === 400322 &&
            <section>
              <h1>Oops,</h1>
              <p>Your verification link is invalid.<br/>Please check your registration email and try again. If you continue to have problems, please CONTACT US.</p>
            </section>
          }
          {regError === 400323 &&
            <section>
              <h1>Oops,</h1>
              <p>Your verification link has expired.<br/>Click below to request a new link.</p>
            </section>
          }
          {regError === 400324 &&
            <section>
              <h1>Oops,</h1>
              <p>Your your email address has already been verified.<br/>Click below to go to your account.</p>
            </section>
          }
          {regError && regError !== 400324 && regError !== 400323 && regError !== 400322 &&
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
