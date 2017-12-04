import React, {Component} from 'react';

import SigninPage from './pages/Signin.js';
import OurProPage from './pages/OurPro.js';
import HomePage from './pages/Home.js';
import LessonsPage from './pages/Lessons.js';
import LessonResponsePage from './pages/LessonResponse.js';
import ProfilePage from './pages/Profile.js';
import NineteenPage from './pages/19Hole.js';
import TipPage from './pages/Tip.js';

import {store} from '../store/store.js';
import {history} from '../store/store.js';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux/es';
import {Switch, Redirect, Route} from 'react-router';

class SwingEssentialsApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/signin" component={SigninPage}/>
            <Route exact path="/our-pro" component={OurProPage}/>
            <Route path="/19th-hole" component={NineteenPage}/>
            <Route path="/tip-of-the-month" component={TipPage}/>
            <Route exact path="/lessons" component={LessonsPage}/>
            <Route exact path="/lessons/:lesson_id" component={LessonResponsePage}/>
            <Route exact path="/profile" component={ProfilePage}/>
            <Route path="*">
              <Redirect to="/"/>
            </Route>  
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default SwingEssentialsApp;
