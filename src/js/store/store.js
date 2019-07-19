import { createStore, applyMiddleware, compose } from 'redux'
import AppReducer from '../reducers/reducers.js'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

// The initial state of the store
export const initialStore = {

    // user personal information
    userData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        unsubscribeSuccess: false,
        unsubscribePending: false,
        users: []
    },

    // user settings
    settings: {
        avatar: '',
        handedness: 'right',
        subbed: true,
        camera: {
            delay: 5,
            duration: 8,
            overlay: false
        }
    },

    // user's available credits
    credits: {
        count: 0,
        unlimited: false,
        unlimitedExpires: 0,
        inProgress: false,
        success: false,
        fail: false
    },

    // user's lesson history
    lessons: {
        loading: false,
        pending: [],
        closed: [],
        // linking: false,
        // linked: false
        redeemPending: false,
        redeemFinished: false,
        redeemSuccess: false,
        coupon: { type: '', value: 0 }
    },

    // tips of the month
    tips: {
        loading: false,
        tipList: []
    },

    // 19th Hole
    blogs: {
        loading: false,
        blogList: []
    },

    // Pro Bios
    pros: {
        loading: false,
        list: []
    },

    // swingessentials available lesson packages
    packages: {
        list: [],
        loading: false
    },

    // discount codes for swingessentials (can only be viewed by admin)
    discounts: {
        list: [],
        loading: false
    },

    // api validation token/ authentication
    login: {
        token: null,
        admin: false,
        failCount: 0,
        settingsAuthenticated: false,
        pendingAuthentication: false
    },

    registration: {
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

    header: {
        activeRoute: '',
        menuOpen: false,
        drawerOpen: false,
        targetRoute: ''
    },

    communication: {
        signInMessage: '',
        modalList: []
    },
};


export const store = createStore(
    AppReducer(history),
    initialStore,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);