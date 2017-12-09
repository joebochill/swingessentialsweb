import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {LOCATION_CHANGE,
		TOKEN_FROM_STORAGE,
		LOGIN_SUCCESS, LOGIN_FAIL, 
		LOGOUT_SUCCESS, LOGOUT_FAIL, 
		OPEN_MENU, CLOSE_MENU, 
		OPEN_DRAWER, CLOSE_DRAWER,
		GET_USER_DATA_SUCCESS, GET_USER_DATA_FAIL, 
		GET_LESSONS, GET_LESSONS_SUCCESS, GET_LESSONS_FAIL, 
		GET_TIPS, GET_TIPS_SUCCESS, GET_TIPS_FAIL, 
		GET_BLOGS, GET_BLOGS_SUCCESS, GET_BLOGS_FAIL, 
		SET_TARGET_ROUTE,
		GET_SETTINGS_SUCCESS, GET_SETTINGS_FAIL
} from '../actions/actions.js';

/* Updates the basic info for the logged in user */
const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
		case GET_USER_DATA_SUCCESS:
			return{...state, 
				username: action.data.personal.username,
				firstName: action.data.personal.first_name,
				lastName: action.data.personal.last_name,
				email: action.data.personal.email,
				phone: action.data.personal.phone
			};
		case LOGOUT_SUCCESS:
			return{...state, 
				username: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			};
		case TOKEN_FROM_STORAGE:
		case GET_USER_DATA_FAIL:
			return{
				username: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			}
		default:
			return state;
	}
}

/* Updates the settings for the logged in user */
const settingsReducer = (state=[], action) => {
	switch(action.type){
		case GET_SETTINGS_SUCCESS:
			return action.data;
		case GET_SETTINGS_FAIL:
			return{
				avatar: '',
				handedness: 'right',
				camera:{
					delay: 5,
					duration: 8,
					overlay: false
				}
			}
		default:
			return state;
	}
}

/* Updates the available credits for the logged in user */
const creditsReducer = (state=[], action) => {
	return state;
}

/* Updates the list of lessons for the logged in user */
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
		case LOGOUT_SUCCESS:
			return{
				loading: false,
				pending: [],
				closed: []
			}
		default:
			return state;
	}
}

/* Updates the posts on the tip of the month page */
const tipsReducer = (state=[], action) => {
	switch(action.type){
		case GET_TIPS:
			return{...state,
				loading: true
			}
		case GET_TIPS_SUCCESS:
			return{
				loading: false,
				tipList: action.data
			}
		case GET_TIPS_FAIL:
			return{
				loading: false,
				tipList: []
			}
		default:
			return state;
	}
}

/* Updates the list of blogs on the 19th hole page */
const blogsReducer = (state=[], action) => {
	switch(action.type){
		case GET_BLOGS:
			return{...state,
				loading: true
			}
		case GET_BLOGS_SUCCESS:
			return{
				loading: false,
				blogList: action.data
			}
		case GET_BLOGS_FAIL:
			return{
				loading: false,
				blogList: []
			}
		default:
			return state;
	}
}

/* Updates the list of available lesson packages */
const packagesReducer = (state=[], action) => {
	return state;
}

/* Updates the current authentication tokens and login failures */
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN_SUCCESS:
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

/* Updates the state of the navigation bar and drawer */
const headerReducer = (state=[], action) => {
	switch(action.type){
		case LOCATION_CHANGE:{
			return{...state,
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
		case SET_TARGET_ROUTE:
			return {...state,
				targetRoute: action.route
			}
		case LOGOUT_SUCCESS:
			return {...state,
				targetRoute: ''
			}
		default:
			return state;
	}
}

/* Updates the messages shown to the user for various success/error conditions */
const communicationReducer = (state=[], action) => {
	return state;
}

const AppReducer = combineReducers({
    userData: userReducer,
    settings: settingsReducer,
    credits: creditsReducer,
	lessons: lessonsReducer,
	tips: tipsReducer,
	blogs: blogsReducer,
    packages: packagesReducer,
	login: loginReducer,
	header: headerReducer,
	communication: communicationReducer,
    router: routerReducer
});

export default AppReducer;