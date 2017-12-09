import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import {requestLogout, setTargetRoute} from '../../actions/actions.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {putUserData} from '../../actions/actions.js';
import '../../../css/Cards.css';


const mapStateToProps = (state)=>{
  return {
    userData: state.userData,
    userSettings: state.settings,
    token: state.login.token
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    replace: (val) => {dispatch(replace(val));},
    requestLogout: (tok) => {dispatch(requestLogout(tok))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    putUserData: (data, token) => {dispatch(putUserData(data, token))}
  }
};

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state={
      editPersonal: false,
      editSecurity: false,
      securityAuthorized: false,
      username: props.userData.username,
      firstName: props.userData.firstName,
      lastName: props.userData.lastName,
      phone: props.userData.phone,
      email: props.userData.email,
      password: ''
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
      this.setState({
        username: nextProps.userData.username,
        firstName: nextProps.userData.firstName,
        lastName: nextProps.userData.lastName,
        phone: nextProps.userData.phone,
        email: nextProps.userData.email,
        newPassword: '',
        newPasswordConfirm: '',
        oldPassword: ''
      })
    }
  }

  updateSettings(type){
    if(type==="personal"){
      if(this.state.editPersonal){
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
        this.setState({editSecurity: false, securityAuthorized: false});
      }
      else{ this.setState({editSecurity: !this.state.editSecurity})}
    }
  }

  render() {
    return (
      <div>
        <section className="landing_image image2">
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
                  <span>PERSONAL</span>
                  <span onClick={() => this.updateSettings("personal")}>{this.state.editPersonal ? "DONE" : "EDIT"}</span>
                </div>
                <div className="card_body">
                  <CardRow alternate nohover title={"First Name"} extra={
                    this.state.editPersonal ? (<input value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})}/>) :
                    (this.state.firstName)
                  }/>
                  <CardRow alternate nohover title={"Last Name"} extra={
                    this.state.editPersonal ? (<input value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})}/>) :
                    (this.state.lastName)
                  }/>
                  <CardRow alternate nohover title={"Phone"} extra={
                    this.state.editPersonal ? (<input value={this.state.phone} onChange={(evt) => this.setState({phone: evt.target.value})}/>) :
                    (this.state.phone)
                  }/>
                </div>
              </div>
              <div className="card">
                <div className="card_header">
                  <span>AUTHENTICATION</span>
                  <span onClick={() => this.updateSettings("security")}>{this.state.editSecurity ? "DONE" : "EDIT"}</span>
                </div>
                <div className="card_body">
                  {this.state.editSecurity && 
                    <div className={"security_check " + (this.state.securityAuthorized ? "clear" : "")}>
                      <div style={{width:"100%"}}>
                        <label>Your password is required to edit these settings</label>
                        <input type="password" value={this.state.oldPassword} onChange={(evt) => this.setState({oldPassword: evt.target.value})}/>
                        <div style={{marginTop:".5rem", cursor:"pointer"}} onClick={() => this.setState({securityAuthorized: true})}>CONTINUE</div>
                      </div>
                    </div>
                  }
                  <CardRow alternate nohover title={"Email"} extra={
                    this.state.editSecurity && this.state.securityAuthorized ? (<input value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}/>) :
                    (this.state.email)
                  }/>
                  <CardRow alternate nohover title={"Username"} extra={
                    this.state.editSecurity && this.state.securityAuthorized ? (<input value={this.state.username} onChange={(evt) => this.setState({username: evt.target.value})}/>) :
                    (this.state.username)
                  }/>
                  <CardRow alternate nohover title={"Password"} extra={
                    this.state.editSecurity && this.state.securityAuthorized ? (<input type="password" value={this.state.newPassword} onChange={(evt) => this.setState({newPassword: evt.target.value})}/>) :
                    ("************")
                  }/>
                </div>
              </div>
              <div className="button se_button" onClick={()=>this.props.requestLogout(this.props.token)} style={{marginTop:'4rem'}}>
                <span>Sign Out</span>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
