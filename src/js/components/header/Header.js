import React, { Component } from 'react';
import './Header.css';
import se_logo from '../../../images/se_logo.png';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions.js';

function mapStateToProps(state){
    return {
        username: state.userData.username
    };
}
function mapDispatchToProps(dispatch){
  return{
      push: (val) => {console.log('yeah');dispatch(push(val));}
  }
}

class Header extends Component {
  render() {
    return (
      <header className="se_header">
        <img src={se_logo} height="48" alt="se_logo"/>
        <ul className="se_menu">
          <li><NavLink to='/' activeClassName='active'>Home</NavLink></li>
          <li><NavLink to='/our-pro' activeClassName='active'>Meet Our Pro</NavLink></li>
          <li><NavLink to='/19th-hole' activeClassName='active'>The 19th Hole</NavLink></li>
          <li><NavLink to='/tip-of-the-month' activeClassName='active'>Tip of the Month</NavLink></li>
          {(this.props.username) ? (
            <li><NavLink to='/account' activeClassName='active'>My Account</NavLink></li>
          ):(
            <li><NavLink to='/login' activeClassName='active'>Sign In</NavLink></li>
          )}
        </ul>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
