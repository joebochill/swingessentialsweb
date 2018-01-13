/* Constants */
import {BASEURL, failure, success, checkTimeout} from './actions.js';
// import {getUserData, getSettings} from './UserDataActions.js';

export const GET_LESSONS = {REQUEST: 'GET_LESSONS', SUCCESS: 'GET_LESSONS_SUCCESS', FAIL: 'GET_LESSONS_FAIL'};
// export const VIDEO_LINK = {REQUEST: 'VIDEO_LINK', SUCCESS: 'VIDEO_LINK_SUCCESS', FAIL: 'VIDEO_LINK_FAIL'};
// export const CLEAR_VIDEO = {REQUEST: 'CLEAR_VIDEO', SUCCESS: 'CLEAR_VIDEO_SUCCESS', FAIL: 'CLEAR_VIDEO_FAIL'};
export const REDEEM_CREDIT = {REQUEST: 'REDEEM_CREDIT', SUCCESS: 'REDEEM_CREDIT_SUCCESS', FAIL: 'REDEEM_CREDIT_FAIL'};
export const ACTIVATE_UNLIMITED = {REQUEST: 'ACTIVATE_UNLIMITED', SUCCESS: 'ACTIVATE_UNLIMITED_SUCCESS', FAIL: 'ACTIVATE_UNLIMITED_FAIL'};
export const PUT_LESSON_RESPONSE = {REQUEST: 'PUT_LESSON_RESPONSE', SUCCESS: 'PUT_LESSON_RESPONSE_SUCCESS', FAIL: 'PUT_LESSON_RESPONSE_FAIL'};
export const GET_CREDITS = {SUCCESS: 'GET_CREDITS_SUCCESS', FAIL: 'GET_CREDITS_FAIL'};
// export const SET_PACKAGE_SELECTION = {REQUEST: 'SET_PACKAGE_SELECTION', SUCCESS: 'SET_PACKAGE_SELECTION_SUCCESS', FAIL: 'SET_PACKAGE_SELECTION_FAIL'};
export const PURCHASE_LESSON = {REQUEST: 'PURCHASE_LESSON', SUCCESS: 'PURCHASE_LESSON_SUCCESS', FAIL: 'PURCHASE_LESSON_FAIL'};
export const CHECK_COUPON = {REQUEST: 'CHECK_COUPON', SUCCESS: 'CHECK_COUPON_SUCCESS', FAIL: 'CHECK_COUPON_FAILURE'};

/* Checks the specified coupon code for validity */
export function checkCoupon(code){
    return (dispatch) => {
        dispatch({type: CHECK_COUPON.REQUEST});

        return fetch(BASEURL+'coupon/'+code)
        .then((response) => {
            switch(response.status){
                case 200:
                    response.json()
                    .then((json) => dispatch(success(CHECK_COUPON.SUCCESS, json)));
                    break;
                default:
                    dispatch(failure(CHECK_COUPON.FAIL, response));
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Purchases the selected lesson type and adds credits to user's account */
export function purchaseLesson(type, token){
    return (dispatch) => {
        dispatch({type: PURCHASE_LESSON.REQUEST});

        return fetch(BASEURL+'purchase/'+type, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(PURCHASE_LESSON.SUCCESS));
                    dispatch(getCredits(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(PURCHASE_LESSON.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Retrieves a list of lessons */
export function getLessons(token){
    return (dispatch) => {
        dispatch({type: GET_LESSONS.REQUEST});
        return fetch(BASEURL+'lessons', { 
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

/* Allows an administrator to reply to a lesson */
export function putLessonResponse(data, token){
    return (dispatch) => {
        dispatch({type: PUT_LESSON_RESPONSE.REQUEST});

        return fetch(BASEURL+'lesson', {
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

/* Retrieves available credits */
export function getCredits(token){
    return (dispatch) => {
        return fetch(BASEURL+'credits', { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) =>{dispatch(success(GET_CREDITS.SUCCESS, json))})
                    .then((response) => localStorage.setItem('credits',JSON.stringify(response)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_CREDITS.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Requests the server to make video available for download */
    // export function getVideoLinks(token, id){
    //     return (dispatch) => {
    //         dispatch({type:VIDEO_LINK.REQUEST});

    //         return fetch(BASEURL+'videos/' + id, { 
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //             }
    //         })
    //         .then((response) => {
    //             switch(response.status) {
    //                 case 200:
    //                     dispatch(success(VIDEO_LINK.SUCCESS));
    //                     break;
    //                 default:
    //                     checkTimeout(response, dispatch);
    //                     dispatch(failure(VIDEO_LINK.FAIL, response));
    //                     break;
    //             }
    //         })
    //         .catch((error) => console.error(error));
    //     }
    // }

/* Removes videos from downloadable location on server */
    // export function clearVideoLinks(token){
    //     return (dispatch) => {
    //         return fetch(BASEURL+'unlink')
    //         .then((response) => {
    //             switch(response.status) {
    //                 case 200:
    //                     dispatch(success(CLEAR_VIDEO.SUCCESS));
    //                     break;
    //                 default:
    //                     checkTimeout(response, dispatch);
    //                     dispatch(failure(CLEAR_VIDEO.FAIL, response));
    //                     break;
    //             }
    //         })
    //         .catch((error) => console.error(error));
    //     }
    // }

/* Lets a user redeem a credit and submit a new lesson request */
export function redeemCredit(data, token){
    return (dispatch) => {
        dispatch({type: REDEEM_CREDIT.REQUEST});
        
        return fetch(BASEURL+'redeem/', { 
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: data
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(REDEEM_CREDIT.SUCCESS));
                    dispatch(getLessons(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(REDEEM_CREDIT.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function activateUnlimited(token){
    return (dispatch) => {
        dispatch({type: ACTIVATE_UNLIMITED.REQUEST});
        
        return fetch(BASEURL+'unlimited/', { 
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(ACTIVATE_UNLIMITED.SUCCESS));
                    dispatch(getCredits(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(ACTIVATE_UNLIMITED.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}