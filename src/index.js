import React from 'react';
import ReactDOM from 'react-dom';
import 'element-closest';
import 'whatwg-fetch';
//import 'es6-symbol';
import 'core-js';
import './css/index.css';
import SwingEssentialsApp from './js/components/SwingEssentialsApp.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SwingEssentialsApp />, document.getElementById('root'));
registerServiceWorker();
