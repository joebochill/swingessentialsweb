import React, { Component } from 'react';
import './Header.css';
import se_logo from '../../../images/se_logo.png';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';
import Menu from './Menu.js';

//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import * as Actions from '../../actions/actions.js';

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

class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen: false
    };
    this._toggleMenu = this._toggleMenu.bind(this);
  }
  _toggleMenu(newState=false){
    if(newState){
      this.setState({menuOpen:true});
      document.body.classList.add('noScroll');
    }
    else{
      this.setState({menuOpen:false});
      document.body.classList.remove('noScroll');
    }
  }
  componentDidMount(){
    window.addEventListener('resize',this._handleResize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this._handleResize.bind(this));
  }
  _handleResize(){
    if(this.state.menuOpen){this._toggleMenu(false)}
  }
  render() {
    return (
      <header className="se_header">
        <img src={se_logo} height="48" alt="se_logo"/>
        <ul className="se_menu_list">
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
        <div className="se_menu_button">
          <svg onClick={()=>this._toggleMenu(true)} className="se_menu_button_icon" height="20px" width="20px"><path d="M0,16.7h20v-2.2H0V16.7z M0,11.1h20V8.9H0V11.1z M0,3.3v2.2h20V3.3H0z"/></svg>
          <div onClick={()=>this._toggleMenu(false)} className={this.state.menuOpen ? "se_menu_overlay" : "se_menu_overlay hidden"}/>
          <Menu closed={!this.state.menuOpen} close={()=>this._toggleMenu(false)}/>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
