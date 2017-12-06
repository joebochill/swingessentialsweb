import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {LOCATION_CHANGE,
		TOKEN_FROM_STORAGE,
		LOGIN_SUCCESS, LOGIN_FAIL, 
		LOGOUT_SUCCESS, LOGOUT_FAIL, 
		OPEN_MENU, CLOSE_MENU, 
		OPEN_DRAWER, CLOSE_DRAWER,
		GET_USER_DATA_SUCCESS, GET_USER_DATA_FAIL, 
		GET_LESSONS, GET_LESSONS_SUCCESS, GET_LESSONS_FAIL
} from '../actions/actions.js';

const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
		case GET_USER_DATA_SUCCESS:
			return{...state, 
				username: action.data.personal.username,
				firstName: action.data.personal.first_name,
				lastName: action.data.personal.last_name
			};
		case LOGOUT_SUCCESS:
			return{...state, 
				username: '',
				firstName: '',
				lastName: ''
			};
		case TOKEN_FROM_STORAGE:
		case GET_USER_DATA_FAIL:
			return{
				username: 'User',
				firstName: '',
				lastName: '',
				email: ''
			}
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
	switch(action.type){
		case GET_LESSONS:
			return{...state,
				loading: true
			}
		case GET_LESSONS_SUCCESS:
			return {
				loading: false,
				pending: action.data.pending,
				closed: action.data.closed
			}
		case GET_LESSONS_FAIL:
			return {...state,
				loading: false
			}
		default:
			return state;
	}
}
const packagesReducer = (state=[], action) => {
	return state;
}
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
			localStorage.setItem('token',action.data.token);
			return{
				token: action.data.token,
				failCount: 0
			}
		case LOGIN_FAIL:
			return{
				token: null,
				failCount: state.failCount + 1
			}
		case LOGOUT_SUCCESS:
			localStorage.removeItem('token');
			return{
				token: null,
				failCount: 0
			}
		case LOGOUT_FAIL:
			return state;
		case TOKEN_FROM_STORAGE:
			return{...state,
				token: action.token
			}
		default:
			return state;
	}
}
const headerReducer = (state=[], action) => {
	switch(action.type){
		case LOCATION_CHANGE:{
			return{
				activeRoute: action.payload.pathname,
				menuOpen: false,
				drawerOpen:false
			}
		}
		case OPEN_MENU:
			return{...state,
				menuOpen: true
			}
		case CLOSE_MENU:
			return{...state,
				menuOpen: false
			}
		case OPEN_DRAWER:
			return{...state,
				drawerOpen: true
			}
		case CLOSE_DRAWER:
			return {...state,
				drawerOpen: false
			}
		default:
			return state;
	}
}

/* This reducer will be responsible for updating the messages shown to the user
for various success/error conditions */
const communicationReducer = (state=[], action) => {
	return state;
}

const AppReducer = combineReducers({
    userData: userReducer,
    settings: settingsReducer,
    credits: creditsReducer,
    lessons: lessonsReducer,
    packages: packagesReducer,
	login: loginReducer,
	header: headerReducer,
	communication: communicationReducer,
    router: routerReducer
});

export default AppReducer;