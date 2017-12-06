import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import {requestLogout, setTargetRoute} from '../../actions/actions.js';
import Footer from '../footer/Footer.js';


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
    requestLogout: (tok) => {dispatch(requestLogout(tok))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))}
  }
};

class ProfilePage extends Component {
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
      //this.props.setTargetRoute('/profile');
      this.props.goToSignIn();
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
          <section>
            <div className="button se_button" onClick={()=>this.props.requestLogout(this.props.token)}>
              <span>Sign Out</span>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
