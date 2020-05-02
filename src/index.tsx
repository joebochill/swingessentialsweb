import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { MainRouter } from './router';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SETheme } from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import 'typeface-open-sans';
import 'typeface-roboto-mono';

import { store } from './redux/store';
import { loadInitialData } from './redux/actions/extra-actions';
import { TokenModal } from './components/dialogs/TokenModal';

const App: React.FC = () => {
    useEffect(() => {
        // @ts-ignore
        store.dispatch(loadInitialData());
    }, []);

    return (
        <Provider store={store}>
            <MainRouter />
            <TokenModal />
        </Provider>
    );
};

ReactDOM.render(
    // <React.StrictMode>
    <ThemeProvider theme={createMuiTheme(SETheme)}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
