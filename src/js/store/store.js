import { createStore, applyMiddleware} from 'redux'
import AppReducer from '../reducers/reducers.js'
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
export const history = createHistory({basename: '/swingessentials'});
// The initial state of the store
export const initialStore = {
    
    // user personal information
    userData:{
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    },

    // user settings
    settings:{
        avatar: '',
        handedness: 'right',
        camera:{
            delay: 5,
            duration: 8,
            overlay: false
        }
    },

    // user's available credits
    credits:{
        count: 0,
        unlimited: false,
        unlimitedExpires: 0
    },

    // user's lesson history
    lessons:{
        loading: false,
        pending:[],
        closed:[],
        linking: false,
        linked: false
    },

    // tips of the month
    tips:{
        loading: false,
        tipList: []
    },

    blogs:{
        loading: false,
        blogList: []
    },

    // swingessentials available lesson packages
    packages:{
        list: [],
        loading: false
    },

    // api validation token/ authentication
    login:{
        token: null,
        admin: false,
        failCount: 0,
        settingsAuthenticated: false,
        pendingAuthentication: false//,
        // lastPing: 0
    },

    registration:{
        pendingRegistration: false,
        registrationActivated: false,
        registrationError: '',
        checkingReset: true,
        resetValid: false,
        resetUser: '',
        resetToken: '',
        userAvailable: true,
        emailAvailable: true,
        registrationFailure: false
    },

    header:{
        activeRoute: '',
        menuOpen: false,
        drawerOpen: false,
        targetRoute: ''
    },

    communication:{
        signInMessage: ''
    },

    router: null
};


export const store = createStore(
    AppReducer,
    initialStore,
    applyMiddleware(thunk, routerMiddleware(history))
);