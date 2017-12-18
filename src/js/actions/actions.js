/* Constants */
    export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
    export const TOKEN_FROM_STORAGE = "TOKEN_FROM_STORAGE";
    export const SET_TARGET_ROUTE = 'SET_TARGET_ROUTE';
    export const TOKEN_TIMEOUT = 'TOKEN_TIMEOUT';

    export const LOGIN = {SUCCESS: 'LOGIN_SUCCESS', FAIL: 'LOGIN_FAIL'};
    export const LOGOUT = {SUCCESS: 'LOGOUT_SUCCESS', FAIL: 'LOGOUT_FAIL'};
    export const VALIDATE_PASSWORD = {REQUEST: 'VALIDATE_PASSWORD', SUCCESS: 'VALIDATE_PASSWORD_SUCCESS', FAIL: 'VALIDATE_PASSWORD_FAIL'};
    export const UPDATE_CREDENTIALS = {REQUEST: 'UPDATE_CREDENTIALS', SUCCESS: 'UPDATE_CREDENTIALS_SUCCESS', FAIL: 'UPDATE_CREDENTIALS_FAIL'};
    
    export const PUT_USER_DATA = {SUCCESS: 'PUT_USER_DATA_SUCCESS', FAIL: 'PUT_USER_DATA_FAIL'};
    export const GET_USER_DATA = {SUCCESS: 'GET_USER_DATA_SUCCESS', FAIL: 'GET_USER_DATA_FAIL'};
    
    export const GET_SETTINGS = {SUCCESS: 'GET_SETTINGS_SUCCESS', FAIL: 'GET_SETTINGS_FAIL'};
    export const GET_LESSONS = {REQUEST: 'GET_LESSONS', SUCCESS: 'GET_LESSONS_SUCCESS', FAIL: 'GET_LESSONS_FAIL'};
    export const GET_TIPS = {REQUEST: 'GET_TIPS', SUCCESS: 'GET_TIPS_SUCCESS', FAIL: 'GET_TIPS_FAIL'};
    export const GET_BLOGS = {REQUEST: 'GET_BLOGS', SUCCESS: 'GET_BLOGS_SUCCESS', FAIL: 'GET_BLOGS_FAIL'};
    export const GET_CREDITS = {SUCCESS: 'GET_CREDITS_SUCCESS', FAIL: 'GET_CREDITS_FAIL'};
    export const GET_PACKAGES = {SUCCESS: 'GET_PACKAGES_SUCCESS', FAIL: 'GET_PACKAGES_FAIL'};

    export const CREATE_ACCOUNT = {REQUEST: 'CREATE_ACCOUNT', SUCCESS: 'CREATE_ACCOUNT_SUCCESS', FAIL: 'CREATE_ACCOUNT_FAIL'};
    export const VERIFY_EMAIL = {REQUEST: 'VERIFY_EMAIL', SUCCESS: 'VERIFY_EMAIL_SUCCESS', FAIL: 'VERIFY_EMAIL_FAIL'};
    export const REQUEST_RESET = {REQUEST: 'REQUEST_RESET', SUCCESS: 'REQUEST_RESET_SUCCESS', FAIL: 'REQUEST_RESET_FAIL'};
    export const VERIFY_RESET = {REQUEST: 'VERIFY_RESET', SUCCESS: 'VERIFY_RESET_SUCCESS', FAIL: 'VERIFY_RESET_FAIL'};
    
    export const CHECK_USER = {REQUEST: 'CHECK_USER', SUCCESS: 'CHECK_USER_SUCCESS', FAIL:'CHECK_USER_FAIL'};
    export const CHECK_EMAIL = {REQUEST: 'CHECK_EMAIL', SUCCESS: 'CHECK_EMAIL_SUCCESS', FAIL:'CHECK_EMAIL_FAIL'};
    
    export const VIDEO_LINK = {REQUEST: 'VIDEO_LINK', SUCCESS: 'VIDEO_LINK_SUCCESS', FAIL: 'VIDEO_LINK_FAIL'};
    export const CLEAR_VIDEO = {REQUEST: 'CLEAR_VIDEO', SUCCESS: 'CLEAR_VIDEO_SUCCESS', FAIL: 'CLEAR_VIDEO_FAIL'};
    
    export const REDEEM_CREDIT = {REQUEST: 'REDEEM_CREDIT', SUCCESS: 'REDEEM_CREDIT_SUCCESS', FAIL: 'REDEEM_CREDIT_FAIL'};
    export const PING = {REQUEST: 'PING_REQUEST', SUCCESS: 'PING_SUCCESS', FAIL: 'PING_FAIL'};

    export const PUT_LESSON_RESPONSE = {REQUEST: 'PUT_LESSON_RESPONSE', SUCCESS: 'PUT_LESSON_RESPONSE_SUCCESS', FAIL: 'PUT_LESSON_RESPONSE_FAIL'};

    export const MENU = {OPEN: 'OPEN_MENU', CLOSE: 'CLOSE_MENU'}; 
    export const DRAWER = {OPEN: 'OPEN_DRAWER', CLOSE: 'CLOSE_DRAWER'}; 
    

/* Base URL for fetch commands */    
const baseUrl = 'http://www.josephpboyle.com/api/myapi.php/';
//const API_KEY = 'AIzaSyAzvggwVpvJ1pngsjQKJ84FcY8v07C8dNA';
//const googleURL = 'https://www.googleapis.com/upload/storage/v1/b/www.joebochill.com/';

/* Database fetch actions */
// export function uploadFile(input){
//     return (dispatch) => {
//         console.log('dispatching');
//         console.log(input.files[0]);
//         let data = new FormData();
//         data.append('file', input.files[0]);
//         //POST https://www.googleapis.com/upload/storage/v1/b/myBucket/o?uploadType=media&name=myObject
        
//         fetch(googleURL+'o?uploadType=media&name=test&key='+API_KEY, {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data'
//           },
//           body: data
//         })
//         .then((response) => {
//             console.log(response);
//             switch(response.status) {
//                 case 200:
//                     dispatch(success('test_success'));
//                     break;
//                 default:
//                     dispatch(failure('test_fail', response));
//                     break;
//             }
//         })    
//     }
// }
// periodic check to see if our token is still valid
// export function ping(token){
    //     console.log('pinging');
    //     return (dispatch) => {
    //         fetch(baseUrl+'ping', {
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //             }
    //         })
    //         .then((response) => {
    //             switch(response.status){
    //                 case 200:
    //                     console.log('ping succeeded - new token');
    //                     const token = response.headers.get('Token');
    //                     localStorage.setItem('token', JSON.stringify(token));
    //                     dispatch(success(PING.SUCCESS, {token: token}));
    //                     break;
    //                 default:
    //                     console.log('ping failed');
    //                     checkTimeout(response, dispatch);
    //             }
    //         })
    //         .catch((error) => console.error(error));
    //     }
// }

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
                    .then((json) => dispatch(success(LOGIN.SUCCESS, {...json,token:token})))
                    .then(() => dispatch(getLessons(token)))
                    //.then(() => dispatch(getCredits(token)))
                    .then(() => dispatch(getSettings(token)));
                    //.then(() => dispatch(getPackages(token)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(LOGIN.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function requestLogout(token){

    localStorage.removeItem('token');

    return (dispatch) => {
        return fetch(baseUrl+'logout', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(LOGOUT.SUCCESS));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(LOGOUT.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function validatePassword(token, pass){
    return (dispatch) => {
        dispatch({type: VALIDATE_PASSWORD.REQUEST});

        return fetch(baseUrl+'validate',{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({password:window.btoa(pass)})
        })
        .then((response) => {
            switch(response.status){
                case 200:
                    dispatch(success(VALIDATE_PASSWORD.SUCCESS));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(VALIDATE_PASSWORD.FAIL, response));
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
                    .then((json) => dispatch(success(GET_USER_DATA.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_USER_DATA.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function putUserData(data, token){
    return (dispatch) => {
        return fetch(baseUrl+'details', { 
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(PUT_USER_DATA.SUCCESS));
                    dispatch(getUserData(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(PUT_USER_DATA.FAIL, response));
                    dispatch(getUserData(token));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function checkUsernameAvailability($username){
    return (dispatch) => {
        return fetch(baseUrl+'checkUser?username='+$username)
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json)=>dispatch(success(CHECK_USER.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(CHECK_USER.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function checkEmailAvailability($email){
    return (dispatch) => {
        return fetch(baseUrl+'checkEmail?email='+$email)
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json)=>dispatch(success(CHECK_EMAIL.SUCCESS,json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(CHECK_EMAIL.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function createAccount(data){
    return (dispatch) => {
        if(Object.keys(data).length < 1){return;}
        dispatch({type: CREATE_ACCOUNT.REQUEST});
        
        return fetch(baseUrl+'user', { 
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(CREATE_ACCOUNT.SUCCESS,{token: response.headers.get('Token')}));
                    dispatch(getUserData(response.headers.get('Token')));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(CREATE_ACCOUNT.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function verifyEmail(code){   
    return (dispatch) => {
        
        dispatch({type: VERIFY_EMAIL.REQUEST});

        return fetch(baseUrl+'verify', { 
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({type:'email',code: code})
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(VERIFY_EMAIL.SUCCESS));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(VERIFY_EMAIL.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function requestReset(data){
    return (dispatch) => {
        fetch(baseUrl+'reset', { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(REQUEST_RESET.SUCCESS));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(REQUEST_RESET.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function verifyReset(code){
    return (dispatch) => {
        
        dispatch({type: VERIFY_RESET.REQUEST});

        return fetch(baseUrl+'verify', { 
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({type:'reset',code: code})
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                .then((json) => dispatch(success(VERIFY_RESET.SUCCESS, json))); 
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(VERIFY_RESET.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function updateUserCredentials(data, token){
    return (dispatch) => {
        dispatch({type: UPDATE_CREDENTIALS.REQUEST});
        
        if(Object.keys(data).length < 1){return;}
        
        return fetch(baseUrl+'credentials', { 
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(UPDATE_CREDENTIALS.SUCCESS,{token: response.headers.get('Token')}));
                    dispatch(getUserData(response.headers.get('Token')));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(UPDATE_CREDENTIALS.FAIL, response));
                    dispatch(getUserData(token));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

// export function redeemCredit(type, data, token){
    //     return (dispatch) => {
    //         dispatch({type: REDEEM_CREDIT.REQUEST});
            
    //         return fetch(baseUrl+'redeem/'+type, { 
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //             },
    //             body: JSON.stringify({fo_swing:'test', dtl_swing:'test'})
    //         })
    //         .then((response) => {
    //             switch(response.status) {
    //                 case 200:
    //                     dispatch(success(REDEEM_CREDIT.SUCCESS));
    //                     dispatch(getLessons(token));
    //                     break;
    //                 default:
    //checkTimeout(response, dispatch);
    //                     dispatch(failure(REDEEM_CREDIT.FAIL, response));
    //                     break;
    //             }
    //         })
    //         .catch((error) => console.error(error));
    //     }
// }

export function getLessons(token){
    return (dispatch) => {
        dispatch({type: GET_LESSONS.REQUEST});
        return fetch(baseUrl+'lessons', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(success(GET_LESSONS.SUCCESS, json)))
                    .then((response) => localStorage.setItem('lessons',JSON.stringify(response.data)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_LESSONS.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function putLessonResponse(data, token){
    return (dispatch) => {
        dispatch({type: PUT_LESSON_RESPONSE.REQUEST});

        return fetch(baseUrl+'lesson', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(PUT_LESSON_RESPONSE.SUCCESS));
                    dispatch(getLessons(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(PUT_LESSON_RESPONSE.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function getTips(){
    return (dispatch) => {
        dispatch({type: GET_TIPS.REQUEST});
        return fetch(baseUrl+'tips')
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(success(GET_TIPS.SUCCESS, json)))
                    .then((response) => localStorage.setItem('tips',JSON.stringify(response.data)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_TIPS.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function getBlogs(){
    return (dispatch) => {
        dispatch({type: GET_BLOGS.REQUEST});
        return fetch(baseUrl+'blogs')
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(success(GET_BLOGS.SUCCESS, json)))
                    .then((response) => localStorage.setItem('blogs',JSON.stringify(response.data)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_BLOGS.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

// export function getCredits(token){
    //     return (dispatch) => {
    //         return fetch(baseUrl+'credits', { 
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //             }
    //         })
    //         .then((response) => {
    //             switch(response.status) {
    //                 case 200:
    //                     response.json()
    //                     .then((json) =>{dispatch(success(GET_CREDITS.SUCCESS, json))})
    //                     .then((response) => localStorage.setItem('credits',JSON.stringify(response)));
    //                     break;
    //                 default:
    //checkTimeout(response, dispatch);
    //                     dispatch(failure(GET_CREDITS.FAIL, response));
    //                     break;
    //             }
    //         })
    //         .catch((error) => console.error(error));
    //     }
// }

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
                    .then((json) => dispatch(success(GET_SETTINGS.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_SETTINGS.FAIL, response));
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
                    .then((json) => dispatch(success(GET_PACKAGES.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_PACKAGES.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function getVideoLinks(token, id){
    return (dispatch) => {
        dispatch({type:VIDEO_LINK.REQUEST});

        return fetch(baseUrl+'videos/' + id, { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(VIDEO_LINK.SUCCESS));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(VIDEO_LINK.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function clearVideoLinks(token){
    return (dispatch) => {
        return fetch(baseUrl+'unlink')
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(CLEAR_VIDEO.SUCCESS));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(CLEAR_VIDEO.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}


/* Success/Failure Actions for the above Request types */

function checkTimeout(response, dispatch){
    // If we get a failed API call, check if our authentication needs to be re-upped
    const error = parseInt(response.headers.get('Error'),10);
    if(error && (error >= 400200 && error <= 400212) && dispatch){
        dispatch({type:TOKEN_TIMEOUT});
    }
}

function failure(type, response){
    console.log(response.headers.get('Error'));
    console.log(response.headers.get('Message'));
    return{
        type: type,
        response: response,
        error: response.headers.get('Error')
    }
}
function success(type, data=null){
    return{
        type: type,
        data: data
    }
}

/* Navigation and Menu Actions */

export function openNavMenu(){
    return{
        type: MENU.OPEN
    }
}
export function openNavDrawer(){
    return{
        type: DRAWER.OPEN
    }
}
export function closeNavMenu(){
    return{
        type: MENU.CLOSE
    }
}
export function closeNavDrawer(){
    return{
        type: DRAWER.CLOSE
    }
}
export function setTargetRoute(route){
    return{
        type: SET_TARGET_ROUTE,
        route: route
    }
}