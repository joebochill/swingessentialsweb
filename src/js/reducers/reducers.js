import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {LOCATION_CHANGE,
		TOKEN_FROM_STORAGE,
		SET_TARGET_ROUTE,
		LOGIN, 
		LOGOUT, 
		VALIDATE_PASSWORD,
		UPDATE_CREDENTIALS,
		GET_USER_DATA, 
		GET_SETTINGS,
		GET_LESSONS, 
		GET_TIPS, 
		GET_BLOGS, 
		MENU, 
		DRAWER
} from '../actions/actions.js';

/* Updates the basic info for the logged in user */
const userReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN.SUCCESS:
		case GET_USER_DATA.SUCCESS:
			return{...state, 
				username: action.data.personal.username,
				firstName: action.data.personal.first_name,
				lastName: action.data.personal.last_name,
				email: action.data.personal.email,
				phone: action.data.personal.phone
			};
		case LOGOUT.SUCCESS:
			return{...state, 
				username: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			};
		case TOKEN_FROM_STORAGE:
		case GET_USER_DATA.FAIL:
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
		case GET_SETTINGS.SUCCESS:
			return action.data;
		case GET_SETTINGS.FAIL:
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
// const creditsReducer = (state=[], action) => {
// 	return state;
// }

/* Updates the list of lessons for the logged in user */
const lessonsReducer = (state=[], action) => {
	switch(action.type){
		case GET_LESSONS.REQUEST:
			return{...state,
				loading: true
			}
		case GET_LESSONS.SUCCESS:
			return {
				loading: false,
				pending: action.data.pending,
				closed: action.data.closed
			}
		case GET_LESSONS.FAIL:
			return {...state,
				loading: false
			}
		case LOGOUT.SUCCESS:
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
		case GET_TIPS.REQUEST:
			return{...state,
				loading: true
			}
		case GET_TIPS.SUCCESS:
			return{
				loading: false,
				tipList: action.data
			}
		case GET_TIPS.FAIL:
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
		case GET_BLOGS.REQUEST:
			return{...state,
				loading: true
			}
		case GET_BLOGS.SUCCESS:
			return{
				loading: false,
				blogList: action.data
			}
		case GET_BLOGS.FAIL:
			return{
				loading: false,
				blogList: []
			}
		default:
			return state;
	}
}

/* Updates the list of available lesson packages */
// const packagesReducer = (state=[], action) => {
// 	return state;
// }

/* Updates the current authentication tokens and login failures */
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN.SUCCESS:
			return{...state,
				token: action.data.token,
				failCount: 0
			}
		case LOGIN.FAIL:
			return{...state,
				token: null,
				failCount: state.failCount + 1
			}
		case LOGOUT.SUCCESS:
			return{...state,
				token: null,
				failCount: 0,
				settingsAuthenticated: false,
				pendingAuthentication: false
			}
		case LOGOUT.FAIL:
			return state;
		case TOKEN_FROM_STORAGE:
			return{...state,
				token: action.token
			}
		case VALIDATE_PASSWORD.REQUEST:
			return{...state,
				pendingAuthentication: true
			}
		case VALIDATE_PASSWORD.SUCCESS:
			return{...state,
				pendingAuthentication: false,
				settingsAuthenticated: true
			}
		case VALIDATE_PASSWORD.FAIL:
		case LOCATION_CHANGE:
			return{...state,
				pendingAuthentication: false,
				settingsAuthenticated: false
			}
		case UPDATE_CREDENTIALS.REQUEST:
		case UPDATE_CREDENTIALS.FAIL:
			return{...state,
				test: true,
				settingsAuthenticated: false
			}
		case UPDATE_CREDENTIALS.SUCCESS:
			return{...state,
				test: false,
				settingsAuthenticated: false,
				token: action.data.token
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
		case MENU.OPEN:
			return{...state,
				menuOpen: true
			}
		case MENU.CLOSE:
			return{...state,
				menuOpen: false
			}
		case DRAWER.OPEN:
			return{...state,
				drawerOpen: true
			}
		case DRAWER.CLOSE:
			return {...state,
				drawerOpen: false
			}
		case SET_TARGET_ROUTE:
			return {...state,
				targetRoute: action.route
			}
		case LOGOUT.SUCCESS:
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
    //credits: creditsReducer,
	lessons: lessonsReducer,
	tips: tipsReducer,
	blogs: blogsReducer,
    //packages: packagesReducer,
	login: loginReducer,
	header: headerReducer,
	communication: communicationReducer,
    router: routerReducer
});

export default AppReducer;