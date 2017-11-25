import { createStore, applyMiddleware} from 'redux'
import AppReducer from '../reducers/reducers.js'
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux'
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
        pending:[],
        closed:[]
    },

    // swingessentials available lesson packages
    packages:[],

    // api validation token
    login:{
        token: null,
        failCount: 0
    },

    router: null
};


export const store = createStore(
    AppReducer,
    initialStore,
    applyMiddleware(thunk, routerMiddleware)
);