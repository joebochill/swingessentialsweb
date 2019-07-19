import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import 'element-closest';
import './css/index.css';
import SwingEssentialsApp from './js/components/SwingEssentialsApp.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SwingEssentialsApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();




