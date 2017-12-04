import React, { Component } from 'react';
import './Header.css';
import se_logo from '../../../images/se_logo.png';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';
import Menu from './Menu.js';

//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import * as Actions from '../../actions/actions.js';
import {requestLogout} from '../../actions/actions.js';

function mapStateToProps(state){
    return {
        username: state.userData.username,
        fname: state.userData.firstName,
        lname: state.userData.lastName,
        token: state.login.token
        // username: 'Joe',
        // fname: 'Joe',
        // lname: 'B.',
        // token: 'token'
    };
}
function mapDispatchToProps(dispatch){
  return{
      push: (val) => {dispatch(push(val));},
      requestLogout: (un,tk) => {dispatch(requestLogout({username:un,token:tk}))}
  }
}

class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      drawerOpen: false,
      accountMenuOpen: false
    };
    this.closeMenus = this._closeMenus.bind(this);
    this.bodyAction = this._bodyAction.bind(this);
  }
  componentDidMount(){
    this._toggleDrawer(false);
    this._removeEventListeners();
    this._addEventListeners();
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
    //window.removeEventListener('scroll', this.bodyAction);
  }
  _closeMenus(){
    if(this.state.drawerOpen){this._toggleDrawer(false);}
    if(this.state.accountMenuOpen){this._toggleMenu(false);}
  }
  _bodyAction(evt){
    if(!evt.target.closest('.se_drop_menu') && !evt.target.closest('.se_menu_button')) {
        this._closeMenus();
    }       
  }
  _toggleDrawer(newState=false){
    if(!this.ref){return;}
    if(newState){
      this.setState({drawerOpen:true});
      document.body.classList.add('noScroll');
    }
    else{
      this.setState({drawerOpen:false});
      document.body.classList.remove('noScroll');
    }
  }
  _toggleMenu(newState=!this.state.accountMenuOpen,menu="account"){
    if(!this.ref){return;}
    this.setState({accountMenuOpen:newState});
  }

  render() {
    return (
      <header className="se_header" ref={(ref)=>this.ref=ref}>
        <img src={se_logo} height="48" alt="se_logo"/>
        <ul className="se_menu_list">
          <li><NavLink to='/' exact>Home</NavLink></li>
          <li><NavLink to='/our-pro/'>Meet Our Pro</NavLink></li>
          <li><NavLink to='/19th-hole/'>The 19th Hole</NavLink></li>
          <li><NavLink to='/tip-of-the-month/'>Tip of the Month</NavLink></li>
          {(this.props.token) && (
            <li className={this.state.accountMenuOpen ? "se_drop_menu open" : "se_drop_menu"}>
              <a onClick={()=>this._toggleMenu()}>{`${this.props.fname} ${this.props.lname.charAt(0)}.`}</a>
              <div className={this.state.accountMenuOpen ? "se_account_menu" : "se_account_menu closed"}>
                <div className="se_menu_panel_links">
                  <NavLink to='/lessons' exact>Lessons</NavLink>
                  <NavLink to='/profile/'>Profile</NavLink>
                  <a onClick={()=>{this.props.requestLogout(this.props.username,this.props.token); this._toggleMenu();}}>Sign Out</a>
                </div>
              </div>
            </li>
          )}
          {(!this.props.token) && (
            <li><NavLink to='/signin/'>Sign In</NavLink></li>
          )}
        </ul>
        <div className="se_menu_button">
          <svg onClick={()=>this._toggleDrawer(true)} className="se_menu_button_icon" height="20px" width="20px"><path d="M0,16.7h20v-2.2H0V16.7z M0,11.1h20V8.9H0V11.1z M0,3.3v2.2h20V3.3H0z"/></svg>
          <div onClick={()=>this._toggleDrawer(false)} className={this.state.drawerOpen ? "se_menu_overlay" : "se_menu_overlay hidden"}/>
          <Menu closed={!this.state.drawerOpen} close={()=>this._toggleDrawer(false)}/>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
