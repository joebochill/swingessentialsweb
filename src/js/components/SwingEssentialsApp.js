import React, {Component} from 'react';

import SigninPage from './pages/Signin.js';
import OurProPage from './pages/OurPro.js';
import HomePage from './pages/Home.js';
import LessonsPage from './pages/Lessons.js';
import LessonResponsePage from './pages/LessonResponse.js';
import FreeLessonPage from './pages/FreeLesson.js';
import PurchasePage from './pages/Purchase.js';
import RedeemPage from './pages/Redeem.js';
import ProfilePage from './pages/Profile.js';
import RegisterPage from './pages/Register.js';
import UnsubscribePage from './pages/Unsubscribe.js';
import ResetPage from './pages/Reset.js';
import ValidationPage from './pages/Validation.js';
import NineteenPage from './pages/19Hole.js';
import TipPage from './pages/Tip.js';
import PackagesPage from './pages/Packages.js';
import DiscountsPage from './pages/Discounts.js';
import PrivacyPage from './pages/Privacy.js';
import TermsPage from './pages/Terms.js';
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
              <Route exact path="/newlesson" component={FreeLessonPage}/>
              <Route exact path="/purchase" component={PurchasePage}/>
              <Route exact path="/redeem" component={RedeemPage}/>
              <Route exact path="/profile" component={ProfilePage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/register/:validation_key" component={ValidationPage}/>
              <Route exact path="/unsubscribe/:uid/:kid" component={UnsubscribePage}/>
              <Route exact path="/reset/:reset_key" component={ResetPage}/>
              <Route exact path="/packages" component={PackagesPage}/>
              <Route exact path="/discounts" component={DiscountsPage}/>
              <Route exact path="/legal/privacy" component={PrivacyPage}/>
              <Route exact path="/legal/terms" component={TermsPage}/>
              <Route path="*">
                <Redirect to="/"/>
              </Route>  
            </Switch>
            <Banner 
              //link={'https://itunes.apple.com/us/app/swing-essentials-golf-app/id1382453145?mt=8'}
              message={<span>We have apps! Check us out on the <a href='https://itunes.apple.com/us/app/swing-essentials-golf-app/id1382453145?mt=8'>App Store</a> or on <a href='https://play.google.com/store/apps/details?id=com.swingessentials.app'>Google Play!</a></span>}
              expires={1533038400}
            />
            <ModalConductor/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default SwingEssentialsApp;
