import React, {Component} from 'react';

import SigninPage from './pages/Signin.js';
import OurProPage from './pages/OurPro.js';
import HomePage from './pages/Home.js';
import LessonsPage from './pages/Lessons.js';
import LessonResponsePage from './pages/LessonResponse.js';
import PurchasePage from './pages/Purchase.js';
import RedeemPage from './pages/Redeem.js';
import ProfilePage from './pages/Profile.js';
import RegisterPage from './pages/Register.js';
import ResetPage from './pages/Reset.js';
import ValidationPage from './pages/Validation.js';
import NineteenPage from './pages/19Hole.js';
import TipPage from './pages/Tip.js';
import PackagesPage from './pages/Packages.js';
import DiscountsPage from './pages/Discounts.js';
import Header from './header/Header.js';
import Banner from './banner/Banner.js';

import ModalConductor from './modals/ModalConductor.js';

import {store} from '../store/store.js';
import {history} from '../store/store.js';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux/es';
import {Switch, Redirect, Route} from 'react-router';

import {requestDataFromToken} from '../actions/LoginActions.js';

class SwingEssentialsApp extends Component {
  componentWillMount(){
    const token = localStorage.getItem('token');
    if(token){
      store.dispatch(requestDataFromToken(token));
    }
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/signin" component={SigninPage}/>
              <Route exact path="/our-pro" component={OurProPage}/>
              <Route exact path="/19th-hole/:page" component={NineteenPage}/>
              <Route path="/19th-hole" component={NineteenPage}/>
              <Route exact path="/tip-of-the-month/:page" component={TipPage}/>
              <Route path="/tip-of-the-month/" component={TipPage}/>
              <Route exact path="/lessons" component={LessonsPage}/>
              <Route exact path="/lessons/:lesson_id" component={LessonResponsePage}/>
              <Route exact path="/purchase" component={PurchasePage}/>
              <Route exact path="/redeem" component={RedeemPage}/>
              <Route exact path="/profile" component={ProfilePage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/register/:validation_key" component={ValidationPage}/>
              <Route exact path="/reset/:reset_key" component={ResetPage}/>
              <Route exact path="/packages" component={PackagesPage}/>
              <Route exact path="/discounts" component={DiscountsPage}/>
              <Route path="*">
                <Redirect to="/"/>
              </Route>  
            </Switch>
            <Banner 
              message={<span>Welcome to our newly designed site! If you find any bugs, please let us know at <b style={{fontWeight: 'bold'}}><a href='mailto:info@swingessentials.com'>info@swingessentials.com</a></b>.</span>}
              expires={1519862400}
            />
            <ModalConductor/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default SwingEssentialsApp;
