export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const TOKEN_FROM_STORAGE = "TOKEN_FROM_STORAGE";
export const LOGIN_SUCCESS =        'LOGIN_SUCCESS';
export const LOGIN_FAIL =           'LOGIN_FAIL';
export const LOGOUT_SUCCESS =       'LOGOUT_SUCCESS';
export const LOGOUT_FAIL =          'LOGOUT_FAIL';
export const GET_USER_DATA_SUCCESS =  'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAIL =     'GET_USER_DATA_FAIL';
export const GET_LESSONS =          'GET_LESSONS';
export const GET_LESSONS_SUCCESS =  'GET_LESSONS_SUCCESS';
export const GET_LESSONS_FAIL =     'GET_LESSONS_FAIL';
export const GET_TIPS =          'GET_TIPS';
export const GET_TIPS_SUCCESS =  'GET_TIPS_SUCCESS';
export const GET_TIPS_FAIL =     'GET_TIPS_FAIL';
export const GET_BLOGS =          'GET_BLOGS';
export const GET_BLOGS_SUCCESS =  'GET_BLOGS_SUCCESS';
export const GET_BLOGS_FAIL =     'GET_BLOGS_FAIL';
export const GET_CREDITS_SUCCESS =  'GET_CREDITS_SUCCESS';
export const GET_CREDITS_FAIL =     'GET_CREDITS_FAIL';
export const GET_SETTINGS_SUCCESS =  'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAIL =     'GET_SETTINGS_FAIL';
export const GET_PACKAGES_SUCCESS =  'GET_PACKAGES_SUCCESS';
export const GET_PACKAGES_FAIL =     'GET_PACKAGES_FAIL';
export const OPEN_MENU =     'OPEN_MENU'; 
export const CLOSE_MENU =     'CLOSE_MENU'; 
export const OPEN_DRAWER =     'OPEN_DRAWER'; 
export const CLOSE_DRAWER =     'CLOSE_DRAWER'; 
export const SET_TARGET_ROUTE = 'SET_TARGET_ROUTE';

const baseUrl = 'http://www.josephpboyle.com/api/myapi.php/';

export function openNavMenu(){
    return{
        type: OPEN_MENU
    }
}
export function openNavDrawer(){
    return{
        type: OPEN_DRAWER
    }
}
export function closeNavMenu(){
    return{
        type: CLOSE_MENU
    }
}
export function closeNavDrawer(){
    return{
        type: CLOSE_DRAWER
    }
}
export function setTargetRoute(route){
    return{
        type: SET_TARGET_ROUTE,
        route: route
    }
}
export function requestDataFromToken(token){
    return (dispatch) => {
        dispatch({type:TOKEN_FROM_STORAGE, token:token});
        dispatch(getUserData(token))
        .then(() => dispatch(getLessons(token)))
        //.then(() => dispatch(getCredits(token)))
        .then(() => dispatch(getSettings(token)));
        //.then(() => dispatch(getPackages(token)));
    }
}
export function requestLogin(userCredentials){
    return (dispatch) => {
        return fetch(baseUrl+'login', { 
            headers: {
                'Authorization': 'Basic ' + window.btoa(userCredentials.username) + '.' + window.btoa(userCredentials.password)
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    const token = response.headers.get('Token');
                    response.json()
                    .then((json) => dispatch(loginSuccess({...json,token:token})))
                    .then(() => dispatch(getLessons(token)))
                    //.then(() => dispatch(getCredits(token)))
                    .then(() => dispatch(getSettings(token)));
                    //.then(() => dispatch(getPackages(token)));
                    break;
                default:
                    dispatch(loginFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function requestLogout(token){
    return (dispatch) => {
        return fetch(baseUrl+'logout', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(logoutSuccess());
                    break;
                default:
                    dispatch(logoutFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getUserData(token){
    return (dispatch) => {
        return fetch(baseUrl+'user', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getUserDataSuccess(json)));
                    break;
                default:
                    dispatch(getUserDataFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getLessons(token){
    return (dispatch) => {
        dispatch({type: GET_LESSONS});
        return fetch(baseUrl+'lessons', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getLessonsSuccess(json)))
                    .then((response) => localStorage.setItem('lessons',JSON.stringify(response.data)));
                    break;
                default:
                    dispatch(getLessonsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getTips(){
    return (dispatch) => {
        dispatch({type: GET_TIPS});
        return fetch(baseUrl+'tips')
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getTipsSuccess(json)))
                    .then((response) => localStorage.setItem('tips',JSON.stringify(response.data)));
                    break;
                default:
                    dispatch(getTipsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getBlogs(){
    return (dispatch) => {
        dispatch({type: GET_BLOGS});
        return fetch(baseUrl+'blogs')
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getBlogsSuccess(json)))
                    .then((response) => localStorage.setItem('blogs',JSON.stringify(response.data)));
                    break;
                default:
                    dispatch(getBlogsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getCredits(token){
    return (dispatch) => {
        return fetch(baseUrl+'credits', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getCreditsSuccess(json)));
                    break;
                default:
                    dispatch(getCreditsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getSettings(token){
    return (dispatch) => {
        return fetch(baseUrl+'settings', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getSettingsSuccess(json)));
                    break;
                default:
                    dispatch(getSettingsFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}
export function getPackages(token){
    return (dispatch) => {
        return fetch(baseUrl+'packages', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(getPackagesSuccess(json)));
                    break;
                default:
                    dispatch(getPackagesFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}


/* Success/Failure Actions for the above Request types */

function loginSuccess(data){
    return{
        type: LOGIN_SUCCESS,
        data: data
    }
}
function loginFailure(response){
    return{
        type: LOGIN_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function logoutSuccess(){
    return{
        type: LOGOUT_SUCCESS
    }
}
function logoutFailure(response){
    return{
        type: LOGOUT_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getLessonsSuccess(data){
    return{
        type: GET_LESSONS_SUCCESS,
        data: data
    }
}
function getLessonsFailure(response){
    return{
        type: GET_LESSONS_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getTipsSuccess(data){
    return{
        type: GET_TIPS_SUCCESS,
        data: data
    }
}
function getTipsFailure(response){
    return{
        type: GET_TIPS_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getBlogsSuccess(data){
    return{
        type: GET_BLOGS_SUCCESS,
        data: data
    }
}
function getBlogsFailure(response){
    return{
        type: GET_BLOGS_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getUserDataSuccess(data){
    return{
        type: GET_USER_DATA_SUCCESS,
        data: data
    }
}
function getUserDataFailure(response){
    return{
        type: GET_USER_DATA_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getCreditsSuccess(data){
    return{
        type: GET_CREDITS_SUCCESS,
        data: data
    }
}
function getCreditsFailure(response){
    return{
        type: GET_CREDITS_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getSettingsSuccess(data){
    return{
        type: GET_SETTINGS_SUCCESS,
        data: data
    }
}
function getSettingsFailure(response){
    return{
        type: GET_SETTINGS_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}
function getPackagesSuccess(data){
    return{
        type: GET_PACKAGES_SUCCESS,
        data: data
    }
}
function getPackagesFailure(response){
    return{
        type: GET_PACKAGES_FAIL,
        response: response.status,
        error: response.headers.get('Error')
    }
}