import React, { Component } from 'react';
import {replace, goBack} from 'react-router-redux';
import {connect} from 'react-redux';
import {setTargetRoute, requestLogin} from '../../actions/actions.js';
import Footer from '../footer/Footer.js';


const mapStateToProps = (state)=>{
    return {
      username: state.userData.username,
      loginFails: state.login.failCount,
      token: state.login.token,
      target: state.header.targetRoute
    };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    // ...bindActionCreators(Actions, dispatch),
    goBack: () => {dispatch(goBack())},
    replace: (val) => {dispatch(replace(val))},
    resetTargetRoute: () => {dispatch(setTargetRoute(''))},
    requestLogin: (cred) => {dispatch(requestLogin(cred))}
  }
}

class SigninPage extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }
  componentWillMount(){
    if(this.props.token){
        this.props.goBack();
    }
    else{
      localStorage.removeItem('token');
      localStorage.removeItem('lessons');
      window.scrollTo(0,0);
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.token){
      localStorage.setItem('token',nextProps.token);

      // if the user was trying to a restricted area, take them there after successful login
      const newRoute = nextProps.target;
      if(newRoute){
        this.props.resetTargetRoute();
        this.props.replace(newRoute);
      }
      else{
        this.props.replace('/lessons');
      }
    }
    else{
        this.setState({password: ''});
        this.pw.focus();
        // TODO: if failure > 3 locked out
    }
  }

  _keyPress(evt){
    if(evt.key === "Enter" && this.state.username && this.state.password){
      this.props.requestLogin({username:this.state.username,password:this.state.password});
    }
  }

  render() {
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Sign In</h1>
            <h3>Access Your Account</h3>
          </main>
        </section>
        <div>
          <section>
            <div className="structured_panel">
              <label>Username or Email</label>
              <input 
                ref={(ref)=>this.un=ref} 
                value={this.state.username} 
                onChange={(evt)=>this.setState({username:evt.target.value})} 
              />
              <label style={{marginTop:'1rem'}}>Password</label>
              <input 
                ref={(ref)=>this.pw=ref} 
                value={this.state.password} 
                onChange={(evt)=>this.setState({password:evt.target.value})} 
                onKeyPress={this._keyPress.bind(this)}
                type="password"
              />
              {this.props.loginFails > 0 && (<span className="validation_error">Your username / password was not correct, please try again.</span>)}
              <div className="button se_button" 
                    style={{marginTop:'2rem'}} 
                    disabled={!this.state.username || !this.state.password}
                    onClick={()=>this.props.requestLogin({username:this.state.username,password:this.state.password})}
              >
                <span>Sign In</span>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
