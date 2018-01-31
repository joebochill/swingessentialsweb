import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import {updateUserCredentials} from '../../actions/UserDataActions.js';
import {validatePassword} from '../../actions/LoginActions.js';

import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {putUserData} from '../../actions/UserDataActions.js';
import {checkUsernameAvailability, checkEmailAvailability} from '../../actions/RegistrationActions.js';
import Loader from '../loader/Loader.js';
import '../../../css/Cards.css';
import '../../../css/Buttons.css';


const mapStateToProps = (state)=>{
  return {
    userData: state.userData,
    userSettings: state.settings,
    token: state.login.token,
    securityAuthorized: state.login.settingsAuthenticated,
    authorizing: state.login.pendingAuthentication,
    emailAvailable: state.registration.emailAvailable,
    userAvailable: state.registration.userAvailable,
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    replace: (val) => {dispatch(replace(val));},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    putUserData: (data, token) => {dispatch(putUserData(data, token))},
    validatePassword: (token, pass) => {dispatch(validatePassword(token, pass))},
    updateUserCredentials: (data, token) => {dispatch(updateUserCredentials(data, token))},
    checkUser: (user) => {dispatch(checkUsernameAvailability(user))},
    checkEmail: (email) => {dispatch(checkEmailAvailability(email))}
  }
};

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state={
      editPersonal: false,
      editSecurity: false,
      username: props.userData.username,
      userFocus: false,
      firstName: props.userData.firstName,
      lastName: props.userData.lastName,
      phone: props.userData.phone,
      validPhone: true,
      email: props.userData.email,
      validEmail: true,
      emailFocus: false,
      oldPassword: '',
      newPassword: '',
      validationError: false
    };
  }
  componentWillMount(){
    if(!this.props.token){
      this.props.setTargetRoute('/profile');
      this.props.goToSignIn();
    }
    else{
      window.scrollTo(0,0);
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      this.props.goToSignIn();
    }
    else{
      if(nextProps.token !== this.props.token){
        localStorage.setItem('token',nextProps.token);
      }

      // when we get new props, update the display
      let newState = {
        newPassword: '',
        newPasswordConfirm: '',
        oldPassword: ''
      };
      // don't update these properties if we are currently editing them
      if(!this.state.editPersonal){
        newState = {...newState,
          firstName: nextProps.userData.firstName,
          lastName: nextProps.userData.lastName,
          phone: nextProps.userData.phone
        }
      }
      if(!this.state.editSecurity){
        newState = {...newState,
          username: nextProps.userData.username,
          email: nextProps.userData.email
        }
      }
      this.setState(newState);
    }
  }

  updateSettings(type){
    if(type==="personal"){
      if(!this.state.firstName || !this.state.lastName || !this.state.validPhone){return false;}
      if(this.state.editPersonal && 
        (this.state.firstName !== this.props.userData.firstName ||
        this.state.lastName !== this.props.userData.lastName ||
        this.state.phone !== this.props.userData.phone)){
          this.props.putUserData({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone
          }, this.props.token);
      }
      this.setState({editPersonal: !this.state.editPersonal})
    }
    else if(type==="security"){
      if(this.state.editSecurity){
        // PUSH THE NEW SETTINGS
        let data = {};
        if(this.state.username && this.state.username !== this.props.userData.username){
          if(!this.props.userAvailable){return false;}
          data.username = this.state.username;
        }
        if(this.state.email && this.state.email !== this.props.userData.email){
          if(!this.props.emailAvailable || !this.state.validEmail){return false;}
          data.email = this.state.email;
        }
        if(this.state.newPassword !== ''){
          data.password = window.btoa(this.state.newPassword);
        }
        this.props.updateUserCredentials(data, this.props.token);
      }
      this.setState({editSecurity: !this.state.editSecurity, password: ''})
    }
  }

  _keyPress(evt){
    if(evt.key === "Enter" && this.state.oldPassword){
      this.props.validatePassword(this.props.token,this.state.oldPassword);    
    }
    
  }

  formattedPhone(){
    if(!this.state.phone){return '';}
    else if(this.state.phone.length < 10){return this.state.phone;}
    return this.state.phone.substr(0,3)+'.'+this.state.phone.substr(3,3)+'.'+this.state.phone.substr(6);
  }

  _validatePhone(){
    if(this.state.phone && this.state.phone.length<10){
      this.setState({validPhone: false});
    }
    else{
      this.setState({validPhone: true});
    }
  }

  _validateUser(){
    if(this.state.username){
      this.props.checkUser(this.state.username);
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
    this.props.checkEmail(this.state.email);
  }

  render() {
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>Your Profile</h1>
            <h3>Manage Your Account</h3>
          </main>
        </section>
        <div>
          <section className="left">
            <div className="structured_panel">
              <div className="card">
                <div className="card_header">
                  <span>Personal</span>
                  <span 
                    disabled={this.state.editPersonal && (!this.state.validPhone || !this.state.firstName || !this.state.lastName)}
                    onClick={() => this.updateSettings("personal")}>{this.state.editPersonal ? "DONE" : "EDIT"}</span>
                </div>
                <div className="card_body">
                  <CardRow alternate nohover title={"First Name"} extra={this.state.editPersonal ? (
                    <input value={this.state.firstName} placeholder={"New First Name"} onChange={(evt) => this.setState({firstName: evt.target.value})}/>) :
                    (this.state.firstName)
                  }/>
                  <CardRow alternate nohover title={"Last Name"} extra={this.state.editPersonal ? (
                    <input value={this.state.lastName} placeholder={"New Last Name"} onChange={(evt) => this.setState({lastName: evt.target.value})}/>) :
                    (this.state.lastName)
                  }/>
                  <CardRow alternate nohover title={"Phone"} extra={ this.state.editPersonal ? (
                      <input 
                        className={(this.state.validPhone ? "" : "error")}
                        ref={(me) => this.phone = me} 
                        value={this.state.phone} 
                        placeholder={"New Phone"} 
                        onFocus={() => this.setState({validPhone: true})}
                        onBlur={() => this._validatePhone()}
                        onChange={(evt) => {let pos = this.phone.selectionStart; this.setState({phone: evt.target.value.replace(/[^0-9]/gi,"").substr(0,10)}); this.phone.selectionStart = pos;}}
                      />) :
                      (this.formattedPhone())
                    }
                  />
                </div>
              </div>
              <div className="card">
                <div className="card_header">
                  <span>Authentication</span>
                  <span 
                    disabled={this.state.editSecurity && 
                      (!this.state.validEmail || 
                        (!this.props.emailAvailable && this.state.email && this.state.email !== this.props.userData.email) || 
                        (!this.props.userAvailable && this.state.username && this.state.username !== this.props.userData.username))}
                    onClick={() => this.updateSettings("security")}>{this.state.editSecurity ? "DONE" : "EDIT"}</span>
                </div>
                <div className="card_body">
                {this.state.editSecurity && !this.props.securityAuthorized &&
                    <div className={"security_check in"}>
                      <div style={{width:"100%"}}>
                        <label>Your password is required to edit these settings</label>
                        <input type="password" value={this.state.oldPassword} 
                          placeholder={"Password"} 
                          onChange={(evt) => this.setState({oldPassword: evt.target.value})} 
                          onKeyPress={this._keyPress.bind(this)}/>
                        <div 
                          style={{
                            marginTop:'1rem', 
                            fontWeight:'600', 
                            cursor:'pointer', 
                            opacity:(this.state.oldPassword ? '1' : '0.2'),
                            pointerEvents: (this.state.oldPassword ? 'auto' : 'none')
                          }} 
                          disabled={!this.state.oldPassword}
                          onClick={() => this.props.validatePassword(this.props.token, this.state.oldPassword)}>CONTINUE</div>
                      </div>
                    </div>
                  }
                  {(this.props.authorizing || this.props.securityAuthorized) &&
                    <div className={"security_check out " + (this.props.securityAuthorized ? "clear" : "")}>
                      {this.props.authorizing && <Loader/>}
                    </div>
                  }
                  <CardRow alternate nohover title={"Email"} extra={this.state.editSecurity && this.props.securityAuthorized ? (
                    <input 
                      className={((this.props.emailAvailable && this.state.validEmail) || this.state.emailFocus || this.state.email === this.props.userData.email ? "" : "error")}
                      value={this.state.email} 
                      placeholder={"New Email Address"} 
                      onChange={(evt) => {this.setState({email: evt.target.value.substr(0,128)});}}
                      onFocus={() => this.setState({emailFocus: true})}
                      onBlur={()=>{this.setState({emailFocus:false}); this._validateEmail();}}/>) 
                    :
                    (this.state.email)
                  }/>
                  <CardRow alternate nohover title={"Username"} extra={this.state.editSecurity && this.props.securityAuthorized ? (
                    <input 
                      className={(this.props.userAvailable || this.state.userFocus || this.state.username === this.props.userData.username ? "" : "error")}
                      value={this.state.username} 
                      placeholder={"New Username"} 
                      onFocus={()=>this.setState({userFocus: true})}
                      onBlur={()=>{this.setState({userFocus: false});this._validateUser()}}
                      onChange={(evt) => this.setState({username: evt.target.value.substr(0,32)})}/>) :
                    (this.state.username)
                  }/>
                  <CardRow alternate nohover title={"Password"} extra={this.state.editSecurity && this.props.securityAuthorized ? (
                    <input type="password" value={this.state.newPassword} placeholder={"New Password"} onChange={(evt) => this.setState({newPassword: evt.target.value})}/>) :
                    ("************")
                  }/>
                  {this.state.editSecurity && this.props.securityAuthorized &&
                    <CardRow alternate nohover title={"Confirm"} style={{animation:"grow 400ms linear"}} extra={this.props.securityAuthorized ? (
                      <input type="password" value={this.state.newPasswordConfirm} placeholder={"New Password"} onChange={(evt) => this.setState({newPasswordConfirm: evt.target.value})}/>):
                      ("************")
                    }/>
                  }
                </div>
              </div>
              {!this.state.validPhone && !this.state.validationError && (
                <span className="validation_error">Invalid Phone Number</span>
              )}
              {!this.props.emailAvailable && (this.state.email !== this.props.userData.email) && (
                <span className="validation_error">Email Address Already Registered</span>
              )}
              {!this.state.validEmail &&  (
                <span className="validation_error">Invalid Email Address</span>
              )}
              {!this.props.userAvailable && (this.state.username !== this.props.userData.username) && (
                <span className="validation_error">Username Already Taken</span>
              )}
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
