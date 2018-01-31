import React, { Component } from 'react';
import '../../../css/Header.css';
import se_logo from '../../../images/SE_horizontal.svg';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';
import Drawer from './Drawer.js';
import {connect} from 'react-redux';
import {openNavDrawer, closeNavDrawer, openNavMenu, closeNavMenu} from '../../actions/NavigationActions.js';
import {requestLogout} from '../../actions/LoginActions.js';
import {openModal} from '../../actions/modalActions.js';


function mapStateToProps(state){
    return {
        username: state.userData.username,
        fname: state.userData.firstName,
        lname: state.userData.lastName,
        token: state.login.token,
        admin: state.login.admin,
        drawerOpen: state.header.drawerOpen,
        menuOpen: state.header.menuOpen,
        activeRoute: state.header.activeRoute,
        registrationActivated: state.login.registrationActivated,
        // lastPing: state.login.lastPing
    };
}
function mapDispatchToProps(dispatch){
  return{
      push: (val) => {dispatch(push(val));},
      requestLogout: (token) => {dispatch(requestLogout(token))},
      openMenu: () => {dispatch(openNavMenu())},
      closeMenu: () => {dispatch(closeNavMenu())},
      openDrawer: () => {dispatch(openNavDrawer())},
      closeDrawer: () => {dispatch(closeNavDrawer())},
      goToSignIn: () => {dispatch(push('/signin'));},
      openModal: (modal) => {dispatch(openModal(modal))}
      // ping: (token) => {dispatch(ping(token))}
  }
}

class Header extends Component {
  constructor(props){
    super(props);

    this.closeMenus = this._closeMenus.bind(this);
    this.bodyAction = this._bodyAction.bind(this);
  }

  componentDidMount(){
    this._removeEventListeners();
    this._addEventListeners();

    if(this.props.token){
      this.tokenTimer = setInterval(() => this._checkTokenTimeout(), 1000);//5*60*1000);
      this.exp = JSON.parse(window.atob(this.props.token.split('.')[1])).exp;
    }
  }

  componentWillReceiveProps(nextProps){
    // Logout should redirect to the signin screen (except for email validation)
    if(this.props.token && !nextProps.token){
      if(!nextProps.activeRoute.match(/^\/register\/[A-Z0-9]{12}$/i)){this.props.goToSignIn();}
      if(this.tokenTimer){clearInterval(this.tokenTimer);}
    }
    // else if(nextProps.token && (this.props.lastPing+5000 < Date.now())){
    //   //this.props.ping(nextProps.token);
    // }
    else if(nextProps.token){
      if(this.tokenTimer){clearInterval(this.tokenTimer);}
      this.tokenTimer = setInterval(() => this._checkTokenTimeout(), 1000);//5*60*1000);
      this.exp = JSON.parse(window.atob(nextProps.token.split('.')[1])).exp;
    }
  }

  componentWillUnmount(){
    this._removeEventListeners();
  }

  _addEventListeners(){
    window.addEventListener('resize',this.closeMenus);
    window.addEventListener('click', this.bodyAction);

    //window.addEventListener('scroll', this.bodyAction);
  }
  _removeEventListeners(){
    window.removeEventListener('resize',this.closeMenus);
    window.removeEventListener('click', this.bodyAction);

    if(this.tokenTimer){clearInterval(this.tokenTimer);}

    //window.removeEventListener('scroll', this.bodyAction);
  }
  _closeMenus(){
    if(this.props.drawerOpen){this.props.closeDrawer();}
    if(this.props.menuOpen){this.props.closeMenu();}
  }
  _bodyAction(evt){
    if(!this.props.drawerOpen && !this.props.menuOpen){return;}
    else if(!evt.target.closest('.se_drop_menu') && !evt.target.closest('.se_menu_button')) {
        this._closeMenus();
    }       
  }

  // Periodically checks the token timeout and will show a renew dialog if the time is < 5 minutes, < 2 minutes
  _checkTokenTimeout(){
    if(!this.props.token){
      if(this.tokenTimer){clearInterval(this.tokenTimer);}
      return;
    }
    // If there are < 3 minutes left on the session, show the popup
    if(this.exp && (this.exp - Date.now()/1000 < 3*60) && (this.exp - Date.now()/1000 > 0)){
      this.props.openModal({type: 'TOKEN_EXPIRE'});
      clearInterval(this.tokenTimer);
    }
  }

  render() {
    return (
      <header className="se_header" ref={(ref)=>this.ref=ref}>
        <img src={se_logo} alt="se_logo" style={{height:'2.5rem', cursor: 'pointer'}} onClick={()=>this.props.push('/')}/>
        <ul className="se_menu_list">
          <li><NavLink to='/' exact>Home</NavLink></li>
          <li><NavLink to='/our-pro/'>Meet Our Pro</NavLink></li>
          <li><NavLink to='/19th-hole/'>The 19th Hole</NavLink></li>
          <li><NavLink to='/tip-of-the-month/'>Tip of the Month</NavLink></li>
          {(this.props.token) && (
            <li className={this.props.menuOpen ? "se_drop_menu open" : "se_drop_menu"}>
              <a onClick={this.props.menuOpen ? ()=>this.props.closeMenu() : () => this.props.openMenu()}>
                {this.props.fname ? 
                    (this.props.fname + (this.props.lname ? " " + this.props.lname.charAt(0) + "." : "" )) :
                    "Account"
                }
              </a>
              <div className={this.props.menuOpen ? "se_account_menu" : "se_account_menu closed"}>
                <div className="se_menu_panel_links">
                  <NavLink to='/lessons' exact>Lessons</NavLink>
                  <NavLink to='/profile/'>Profile</NavLink>
                  {this.props.admin &&
                  <NavLink to='/packages/'>Packages</NavLink>
                  }
                  {this.props.admin &&
                  <NavLink to='/discounts/'>Discounts</NavLink>
                  }
                  <a onClick={()=>{this.props.requestLogout(this.props.token); this.props.closeMenu();}}>Sign Out</a>
                </div>
              </div>
            </li>
          )}
          {(!this.props.token) && (
            <li><NavLink to='/signin/'>Sign In</NavLink></li>
          )}
        </ul>
        <div className="se_menu_button">
          <svg 
            onClick={this.props.drawerOpen ? ()=>this.props.closeDrawer() : ()=>this.props.openDrawer()} 
            className="se_menu_button_icon" viewBox="0 0 20 20">
            <path d="M0,16.7h20v-2.2H0V16.7z M0,11.1h20V8.9H0V11.1z M0,3.3v2.2h20V3.3H0z"/>
          </svg>
          <div 
            onClick={()=>this.props.closeDrawer()} 
            className={this.props.drawerOpen ? "se_menu_overlay" : "se_menu_overlay hidden"}
          />
          <Drawer/>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
