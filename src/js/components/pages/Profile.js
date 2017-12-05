import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import {requestLogout} from '../../actions/actions.js';


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

class ProfilePage extends Component {
  componentWillMount(){
    if(!this.props.username){
      this.props.goToSignIn();
    }
    else{
      window.scrollTo(0,0);
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
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Your Profile</h1>
            <h3>Manage Your Account</h3>
          </main>
        </section>
        <div>
          <section>
            <div className="button se_button" onClick={()=>this.props.requestLogout(this.props.username,this.props.token)}>
              <span>Sign Out</span>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
