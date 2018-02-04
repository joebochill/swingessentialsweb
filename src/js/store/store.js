import { createStore, applyMiddleware} from 'redux'
import AppReducer from '../reducers/reducers.js'
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
export const history = createHistory({basename: '/'});
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
        unlimitedExpires: 0,
        inProgress: false,
        success: false,
        fail: false
    },

    // user's lesson history
    lessons:{
        loading: false,
        pending:[],
        closed:[],
        // linking: false,
        // linked: false
        redeemPending: false,
        redeemFinished: false,
        redeemSuccess: false,
        coupon: {type: '', value: 0}
    },

    // tips of the month
    tips:{
        loading: false,
        tipList: []
    },

    // 19th Hole
    blogs:{
        loading: false,
        blogList: []
    },

    // Pro Bios
    pros:{
        loading: false,
        list: []
    },

    // swingessentials available lesson packages
    packages:{
        list: [],
        loading: false
    },

    // discount codes for swingessentials (can only be viewed by admin)
    discounts:{
        list: [],
        loading: false
    },

    // api validation token/ authentication
    login:{
        token: null,
        admin: false,
        failCount: 0,
        settingsAuthenticated: false,
        pendingAuthentication: false
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
        lastUserChecked: '',
        emailAvailable: true,
        lastEmailChecked: '',
        registrationFailure: false
    },

    header:{
        activeRoute: '',
        menuOpen: false,
        drawerOpen: false,
        targetRoute: ''
    },

    communication:{
        signInMessage: '',
        modalList: []
    },

    router: null
};


export const store = createStore(
    AppReducer,
    initialStore,
    applyMiddleware(thunk, routerMiddleware(history))
);