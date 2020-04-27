import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { MainRouter } from './router';
import { rootReducer } from './redux/reducers';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SETheme } from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import 'typeface-open-sans';
import 'typeface-roboto-mono';

import { createStore, applyMiddleware } from 'redux';
const store = createStore(rootReducer(), applyMiddleware(thunk));

ReactDOM.render(
    // <React.StrictMode>
    <ThemeProvider theme={createMuiTheme(SETheme)}>
        <CssBaseline />
        <Provider store={store}>
            <MainRouter />
        </Provider>
    </ThemeProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
