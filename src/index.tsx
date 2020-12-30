import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { loadInitialData } from './redux/actions/extra-actions';
import { Provider } from 'react-redux';
import { MainRouter } from './router';
import { store } from './redux/store';
import { TokenModal } from './components/dialogs/TokenModal';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SETheme } from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import 'typeface-open-sans';
import 'typeface-roboto-mono';

import ReactGA from 'react-ga';
import { gaID } from './__analytics__/ga.js';
if (gaID) {
    ReactGA.initialize(gaID);
}

const App: React.FC = () => {
    useEffect(() => {
        // @ts-ignore
        store.dispatch(loadInitialData());
    }, []);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Provider store={store}>
                <MainRouter />
                <TokenModal />
            </Provider>
        </MuiPickersUtilsProvider>
    );
};

ReactDOM.render(
    <ThemeProvider theme={createMuiTheme(SETheme)}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
