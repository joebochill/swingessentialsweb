import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR} from '../actions/actions.js';

const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			return{...state, 
				username: action.data.user_data.personal.username
			};
		default:
			return state;
	}
}
const settingsReducer = (state=[], action) => {
	return state;
}
const creditsReducer = (state=[], action) => {
	return state;
}
const lessonsReducer = (state=[], action) => {
	return state;
}
const packagesReducer = (state=[], action) => {
	return state;
}
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			return{...state,
				token: action.data.token,
				failCount: 0
			}
		case LOGIN_ERROR:
			return{...state,
				token: null,
				failCount: state.failCount + 1
			}
		case LOGOUT_SUCCESS:
			return{...state,
				token: null,
				failCount: 0
			}
		case LOGOUT_ERROR:
			return state;
		default:
			return state;
	}
}

const AppReducer = combineReducers({
    userData: userReducer,
    settings: settingsReducer,
    credits: creditsReducer,
    lessons: lessonsReducer,
    packages: packagesReducer,
    login: loginReducer,
    router: routerReducer
});

export default AppReducer;