import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import {requestLogout, setTargetRoute} from '../../actions/actions.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
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
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))}
  }
};

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state={
      editPersonal: false,
      editCommunication: false,
      editSecurity: false,
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
        password: ''
      })
    }
  }

  updateSettings(type){
    if(type==="personal"){
      this.setState({editPersonal: !this.state.editPersonal})
    }
    else if(type==="communication"){
      this.setState({editCommunication: !this.state.editCommunication})
    }
    else if(type==="security"){
      this.setState({editSecurity: !this.state.editSecurity})
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
                  <span>COMMUNICATION</span>
                  <span onClick={() => this.updateSettings("communication")}>{this.state.editCommunication ? "DONE" : "EDIT"}</span>
                  </div>
                <div className="card_body">
                  <CardRow alternate nohover title={"Email"} extra={
                    this.state.editCommunication ? (<input value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}/>) :
                    (this.state.email)
                  }/>
                </div>
              </div>
              <div className="card">
                <div className="card_header">
                  <span>SECURITY</span>
                  <span onClick={() => this.updateSettings("security")}>{this.state.editSecurity ? "DONE" : "EDIT"}</span>
                </div>
                <div className="card_body">
                  <CardRow alternate nohover title={"Username"} extra={
                    this.state.editSecurity ? (<input value={this.state.username} onChange={(evt) => this.setState({username: evt.target.value})}/>) :
                    (this.state.username)
                  }/>
                  <CardRow alternate nohover title={"Password"} extra={
                    this.state.editSecurity ? (<input type="password" value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}/>) :
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
