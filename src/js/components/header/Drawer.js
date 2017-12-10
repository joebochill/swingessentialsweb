import React, { Component } from 'react';
import '../../../css/Header.css';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';
import {requestLogout, closeNavDrawer} from '../../actions/actions.js';

function mapStateToProps(state){
    return {
        username: state.userData.username,
        fname: state.userData.firstName,
        lname: state.userData.lastName,
        token: state.login.token,
        drawerOpen: state.header.drawerOpen
    };
}
function mapDispatchToProps(dispatch){
  return{
      push: (val) => {dispatch(push(val));},
      requestLogout: (token) => {dispatch(requestLogout(token))},
      closeDrawer: () => {dispatch(closeNavDrawer())}
  }
}

class Drawer extends Component {
  
  render() {
    return (
        <div className={!this.props.drawerOpen ? "se_menu_panel closed" : "se_menu_panel"}>
          <div className="se_menu_bar">
            {this.props.username && <span className="se_welcome">{"Welcome"+(this.props.fname?", "+this.props.fname+(this.props.lname?" " + this.props.lname.charAt(0):""):"")+"!"}</span>}
            <svg 
              onClick={()=>this.props.closeDrawer()} 
              className="se_menu_button_icon" viewBox="0 0 20 20">
                <polygon points="17.9,3.7 16.3,2.1 10,8.4 3.7,2.1 2.1,3.7 8.4,10 2.1,16.3 3.7,17.9 10,11.6 16.3,17.9 17.9,16.3 11.6,10 "/>
            </svg>
          </div>
          <div className="se_menu_panel_links">
            <NavLink to='/' exact>Home</NavLink>
            <NavLink to='/our-pro/'>Meet Our Pro</NavLink>
            <NavLink to='/19th-hole/'>The 19th Hole</NavLink>
            <NavLink to='/tip-of-the-month/'>Tip of the Month</NavLink>
            {(this.props.token) && (
              <NavLink to='/lessons/'>Lessons</NavLink>
            )}
            {(this.props.token) && (
              <NavLink to='/profile/'>Profile</NavLink>
            )}
            {(this.props.token) && (
              <a onClick={()=>{this.props.requestLogout(this.props.token); this.props.closeDrawer()}}>Sign Out</a>
            )}
            {(!this.props.token) && (
              <NavLink to='/signin/'>Sign In</NavLink>
            )}
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
