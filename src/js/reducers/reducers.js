import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

import {LOCATION_CHANGE, GET_TIPS, GET_BLOGS, TOKEN_TIMEOUT, GET_PACKAGES, UPDATE_BLOGS} from '../actions/actions.js';
import {SET_TARGET_ROUTE, MENU, DRAWER} from '../actions/NavigationActions.js';
import {TOKEN_FROM_STORAGE, LOGIN, LOGOUT, VALIDATE_PASSWORD} from '../actions/LoginActions.js';
import {GET_LESSONS, /*VIDEO_LINK,*/ GET_CREDITS, /*CLEAR_VIDEO, REDEEM_CREDIT, PUT_LESSON_RESPONSE*/
PURCHASE_LESSON,
REDEEM_CREDIT,
CHECK_COUPON} from '../actions/LessonActions.js';
import {CREATE_ACCOUNT, VERIFY_EMAIL, /*REQUEST_RESET,*/ VERIFY_RESET, CHECK_USER, CHECK_EMAIL} from '../actions/RegistrationActions.js';
import {UPDATE_CREDENTIALS, /*PUT_USER_DATA,*/ GET_USER_DATA, GET_SETTINGS} from '../actions/UserDataActions.js';

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
		case TOKEN_TIMEOUT:
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
		case LOGOUT.SUCCESS:
		case LOGOUT.FAIL:
		case GET_SETTINGS.FAIL:
		case TOKEN_TIMEOUT:
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
	switch(action.type){
		case GET_CREDITS.SUCCESS:
			return {...state,
				count: parseInt(action.data.count, 10) || 0,
				unlimited: action.data.unlimited_count,
				unlimitedExpires: parseInt(action.data.unlimited_expires, 10) || 0
			}
		case LOGOUT.SUCCESS:
		case LOGOUT.FAIL:
		case GET_CREDITS.FAIL:
		case TOKEN_TIMEOUT:
			return {...state,
				count: 0,
				unlimited: 0,
				unlimitedExpires: 0
			}
		case PURCHASE_LESSON.REQUEST:
			return{...state,
				inProgress: true,
				success: false,
				fail: false
			}
		case PURCHASE_LESSON.SUCCESS:
			return{...state,
				inProgress: false,
				success: true,
				fail: false
			}
		case PURCHASE_LESSON.FAIL:
			return{...state,
				inProgress: false,
				success: false,
				fail: true
			}
		case LOCATION_CHANGE:
			return{...state,
				inProgress: false,
				success: false,
				fail: false
			}
		default:
			return state;
	}
}

/* Updates the list of lessons for the logged in user */
const lessonsReducer = (state=[], action) => {
	switch(action.type){
		case GET_LESSONS.REQUEST:
			return{...state,
				loading: true
			}
		case GET_LESSONS.SUCCESS:
			return {...state,
				loading: false,
				pending: action.data.pending,
				closed: action.data.closed
			}
		case GET_LESSONS.FAIL:
			return {...state,
				loading: false
			}
		case LOGOUT.SUCCESS:
		case TOKEN_TIMEOUT:
			return{...state,
				loading: false,
				pending: [],
				closed: []
			}
		case REDEEM_CREDIT.REQUEST:
			return {...state,
				redeemPending: true,
				redeemFinished: false,
				redeemSuccess: false
			}
		case REDEEM_CREDIT.SUCCESS:
			return {...state,
				redeemPending: false,
				redeemFinished: true,
				redeemSuccess: true
			}
		case REDEEM_CREDIT.FAIL:
			return {...state,
				redeemPending: false,
				redeemFinished: true,
				redeemSuccess: false
			}
		case LOCATION_CHANGE:
			return {...state,
				redeemPending: false,
				redeemFinished: false,
				redeemSuccess: false,
				coupon:{
					type: '',
					value: 0,
					error: ''
				}
			}
		// case VIDEO_LINK.REQUEST:
		// 	return{...state,
		// 		linking: true
		// 	}
		// case VIDEO_LINK.SUCCESS:
		// 	return{...state,
		// 		linking: false,
		// 		linked: true
		// 	}
		// case VIDEO_LINK.FAIL:
		// 	return{...state,
		// 		linking: false,
		// 		linked: false
		// 	}
		case CHECK_COUPON.SUCCESS:
			return{...state,
				coupon:{
					type: action.data.type,
					value: parseInt(action.data.value, 10),
					error: ''
				}
			}
		case CHECK_COUPON.FAIL:
			return{...state,
				coupon:{
					type: '',
					value: 0,
					error: (action.error === 400301) ? "Coupon Code is Expired" : "Invalid Coupon Code"
				}
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
		case LOGOUT.SUCCESS:
		case LOGOUT.FAIL:
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
		case UPDATE_BLOGS.REQUEST:
			return{...state,
				loading: true
			}
		case GET_BLOGS.SUCCESS:
			return{
				loading: false,
				blogList: action.data
			}
		case LOGOUT.SUCCESS:
		case LOGOUT.FAIL:
		case GET_BLOGS.FAIL:
		case TOKEN_TIMEOUT:
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
	switch(action.type){
		case GET_PACKAGES.REQUEST:
			return{...state,
				loading: true
			}
		case GET_PACKAGES.SUCCESS:
			return{...state,
				list: action.data,
				loading: false
			}
		case GET_PACKAGES.FAIL:
			return{...state,
				loading: false
			}
		default:
			return state;
	}
}

/* Updates the current authentication tokens and login failures */
const loginReducer = (state=[], action) => {
	switch(action.type){
		case LOGIN.SUCCESS:
			return{...state,
				token: action.data.token,
				admin: (JSON.parse(window.atob(action.data.token.split('.')[1]))['role'].toLowerCase()==='administrator')
			}
		case CREATE_ACCOUNT.SUCCESS:
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
			return {...state,
				token: null
			}
		case TOKEN_FROM_STORAGE:
			return{...state,
				token: action.token,
				admin: (JSON.parse(window.atob(action.token.split('.')[1]))['role'].toLowerCase()==='administrator')				
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
				settingsAuthenticated: false
			}
		case UPDATE_CREDENTIALS.SUCCESS:
			return{...state,
				settingsAuthenticated: false,
				token: action.data.token
			}
		// case PING.SUCCESS:
		// 	return{...state,
		// 		token: action.data.token,
		// 		lastPing: Date.now()
		// 	}
		// case PING.FAIL:
		// 	return{...state,
		// 		lastPing: Date.now()
		// 	}
		case TOKEN_TIMEOUT:
			return{...state,
				token: null
			}
		default:
			return state;
	}
}

const registrationReducer = (state=[], action) => {
	switch(action.type){
		case CREATE_ACCOUNT.SUCCESS:
		case LOCATION_CHANGE:
			return{...state,
				pendingRegistration: false,
				registrationActivated: false,
				registrationFailure: false
			}
		case CREATE_ACCOUNT.FAIL:
			return{...state,
				registrationFailure: true
			}
		case VERIFY_EMAIL.REQUEST:
			return{...state,
				pendingRegistration: true,
				registrationActivated: false,
				registrationError: ''
			}
		case VERIFY_EMAIL.SUCCESS:
			return{...state,
				pendingRegistration: false,
				registrationActivated: true,
				registrationError: ''
			}
		case VERIFY_EMAIL.FAIL:
			return{...state,
				pendingRegistration: false,
				registrationActivated: false,
				registrationError: isNaN(parseInt(action.error,10)) ? '' : parseInt(action.error,10)
			}
		// case VERIFY_RESET:
		// 	return{...state,
		// 		checkingReset: true
		// 	}
		case VERIFY_RESET.SUCCESS:
			return{...state,
				checkingReset: false,
				resetValid: true,
				resetUser: action.data.username,
				resetToken: action.data.auth
			}
		case VERIFY_RESET.FAIL:
			return{...state,
				checkingReset: false,
				resetValid: false,
				resetUser: '',
				resetToken: ''
			}
		case CHECK_USER.SUCCESS:
			return{...state,
				userAvailable: action.data.available
			}
		case CHECK_EMAIL.SUCCESS:
			return{...state,
				emailAvailable: action.data.available
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
	switch(action.type){
		case TOKEN_TIMEOUT:
			return{...state,
				signInMessage: 'For security purposes, you have been automatically signed out.'
			}
		default:
			return state;
	}
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
	registration: registrationReducer,
	header: headerReducer,
	communication: communicationReducer,
    router: routerReducer
});

export default AppReducer;