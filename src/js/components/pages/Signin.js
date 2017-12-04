import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {replace} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/actions.js';


const mapStateToProps = (state)=>{
    return {
      username: state.userData.username,
      loginFails: state.login.failCount,
      token: state.login.token
    };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    ...bindActionCreators(Actions, dispatch),
    replace: (val) => {dispatch(replace(val))}
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
    window.scrollTo(0,0);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.token){
        this.props.replace('/lessons');
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
        <Header/>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Sign In</h1>
            <h3>Access Your Account</h3>
          </main>
        </section>
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
