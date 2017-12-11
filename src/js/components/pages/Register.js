import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
// import {/*requestLogout, */setTargetRoute, validatePassword, updateUserCredentials} from '../../actions/actions.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {createAccount} from '../../actions/actions.js';
// import Loader from '../loader/Loader.js';
import '../../../css/Cards.css';
import '../../../css/Buttons.css';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    createAccount: (data) => {dispatch(createAccount(data))},
    replace: (path) => {dispatch(replace(path))}
  }
};

class RegisterPage extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirm: '',
      passwordsMatch: true,
      validEmail: true,
      validPhone: true,
      validationError: false
    };
  }
  componentWillMount(){
    if(this.props.token){
      this.props.replace('/profile');
    }
    else{
      window.scrollTo(0,0);
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.token){
      localStorage.setItem('token',nextProps.token);
      this.props.replace('/lessons');
    }
    else{
      //TODO: Handle registration error
    }
  }

  _validateEmail(){
    if(!this.state.email){return;}
    if(!this.state.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)){
      this.setState({validEmail: false});
    }
    else{
      this.setState({validEmail: true});
    }
  }
  _validatePhone(){
    if(this.state.phone && this.state.phone.length<10){
      this.setState({validPhone: false});
    }
    else{
      this.setState({validPhone: true});
    }
  }
  _validateFields(){
    return(
      this.state.username && 
      this.state.firstName && 
      this.state.lastName && 
      this.state.email && this.state.validEmail &&
      (!this.state.phone || (this.state.phone && this.state.validPhone)) &&
      this.state.password && 
      this.state.password === this.state.passwordConfirm);
  }

  _checkPasswords(pass=null,conf=null){
    pass = pass || this.state.password;
    conf = conf || this.state.passwordConfirm;

    if(pass && conf && pass !== conf){
      this.setState({passwordsMatch: false});
    }
    else{
      this.setState({passwordsMatch: true});
    }
  }

  _submitRegistration(){
    if(!this._validateFields()){
      this.setState({validationError: true});
      return;
    }
    else{
      this.setState({validationError: false});
      this.props.createAccount({
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password
      });
    }
  }

  render() {
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>Sign Up</h1>
            <h3>Create an Account</h3>
          </main>
        </section>
        <div>
          <section className="left">
            <div className="structured_panel">
              <div className="card">
                <div className="card_header">
                  <span>ACCOUNT INFO</span>
                </div>
                <div className="card_body">
                  <CardRow alternate nohover title={"First Name"} extra={
                    <input value={this.state.firstName} placeholder={"First Name"} 
                      onChange={(evt) => this.setState({firstName: evt.target.value.replace(/[^A-Z- .]/gi,"")})}/>
                  }/>
                  <CardRow alternate nohover title={"Last Name"} extra={
                    <input value={this.state.lastName} placeholder={"Last Name"} 
                      onChange={(evt) => this.setState({lastName: evt.target.value.replace(/[^A-Z- .]/gi,"")})}/>
                  }/>
                  <CardRow alternate nohover title={"Phone"} extra={ 
                    <input value={this.state.phone} placeholder={"Optional"} className={(this.state.validPhone ? "" : "error")}
                    onChange={(evt) => this.setState({phone: evt.target.value.replace(/[^0-9]/gi,"").substr(0,10)})} 
                    onFocus={() => this.setState({validPhone: true})}
                    onBlur={() => this._validatePhone()}/>
                  }
                  />
                  <CardRow alternate nohover title={"Email"} extra={
                    <input value={this.state.email} placeholder={"Email Address"} className={(this.state.validEmail ? "" : "error")}
                      onChange={(evt) => this.setState({email: evt.target.value})}
                      onFocus={() => this.setState({validEmail: true})}
                      onBlur={()=>this._validateEmail()}/>
                  }/>
                  <CardRow alternate nohover title={"Username"} extra={
                    <input value={this.state.username} placeholder={"Username"} 
                      onChange={(evt) => this.setState({username: evt.target.value.replace(/[^A-Z0-9-_.$#@!+]/gi,"")})}/>
                  }/>
                  <CardRow alternate nohover title={"Password"} extra={
                    <input type="password" value={this.state.password} placeholder={"Password"} className={(this.state.passwordsMatch ? "" : "error")} 
                      onChange={(evt) => {this.setState({password: evt.target.value}); this._checkPasswords(evt.target.value,this.state.passwordConfirm);}} 
                      onBlur={()=>this._checkPasswords()}/>
                  }/>
                  <CardRow alternate nohover title={"Confirm"} extra={
                    <input type="password" value={this.state.passwordConfirm} placeholder={"Confirm Password"} className={(this.state.passwordsMatch ? "" : "error")}
                      onChange={(evt) => {this.setState({passwordConfirm: evt.target.value}); this._checkPasswords(this.state.password, evt.target.value);}}
                      onBlur={()=>this._checkPasswords()}/>
                  }/>
                </div>
              </div>
              {!this.state.validPhone && !this.state.validationError && (
                <span className="validation_error">Invalid Phone Number</span>
              )}
              {!this.state.validEmail && !this.state.validationError && (
                <span className="validation_error">Invalid Email Address</span>
              )}
              {!this.state.passwordsMatch && !this.state.validationError && (
                <span className="validation_error">Passwords Don't Match</span>
              )}
              {this.state.validationError && (
                <span className="validation_error">Invalid Registration Data</span>
              )}
              <div className="button se_button" 
                onClick={()=>this._submitRegistration()} style={{marginTop:'2rem'}}
                disabled={!this._validateFields()}
                >
                <span>CREATE</span>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);
