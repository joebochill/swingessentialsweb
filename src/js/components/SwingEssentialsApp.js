import React, {Component} from 'react';

import LoginPage from './pages/Login.js';
import HomePage from './pages/Home.js';

import {store} from '../store/store.js';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux/es';
import createHistory from 'history/createBrowserHistory';
import {Switch, Redirect, Route} from 'react-router';

const history = createHistory({basename: '/swingessentials'});

class SwingEssentialsApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
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
