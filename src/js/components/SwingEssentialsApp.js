import React, {Component} from 'react';

import SigninPage from './pages/Signin.js';
import OurProPage from './pages/OurPro.js';
import HomePage from './pages/Home.js';

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
            <Route path="/signin" component={SigninPage}/>
            <Route path="/our-pro" component={OurProPage}/>
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
