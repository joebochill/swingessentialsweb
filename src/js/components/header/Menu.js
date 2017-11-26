import React, { Component } from 'react';
import './Header.css';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        username: state.userData.username
    };
}
function mapDispatchToProps(dispatch){
  return{
      push: (val) => {dispatch(push(val));}
  }
}

class Menu extends Component {
  render() {
    return (
        <div className={this.props.closed ? "se_menu_panel closed" : "se_menu_panel"}>
          <div className="se_menu_bar">
            <svg onClick={this.props.close} className="se_menu_button_icon" height="20px" width="20px"><polygon points="17.9,3.7 16.3,2.1 10,8.4 3.7,2.1 2.1,3.7 8.4,10 2.1,16.3 3.7,17.9 10,11.6 16.3,17.9 17.9,16.3 11.6,10 "/></svg>
          </div>
          <div className="se_menu_panel_links">
            <NavLink to='/' activeClassName='active'>Home</NavLink>
            <NavLink to='/our-pro' activeClassName='active'>Meet Our Pro</NavLink>
            <NavLink to='/19th-hole' activeClassName='active'>The 19th Hole</NavLink>
            <NavLink to='/tip-of-the-month' activeClassName='active'>Tip of the Month</NavLink>
            {(this.props.username) ? (
              <NavLink to='/account' activeClassName='active'>My Account</NavLink>
            ):(
              <NavLink to='/login' activeClassName='active'>Sign In</NavLink>
            )}
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
