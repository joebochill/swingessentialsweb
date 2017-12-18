/* Constants */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const TOKEN_TIMEOUT = 'TOKEN_TIMEOUT';

export const GET_TIPS = {REQUEST: 'GET_TIPS', SUCCESS: 'GET_TIPS_SUCCESS', FAIL: 'GET_TIPS_FAIL'};
export const GET_BLOGS = {REQUEST: 'GET_BLOGS', SUCCESS: 'GET_BLOGS_SUCCESS', FAIL: 'GET_BLOGS_FAIL'};
export const GET_PACKAGES = {SUCCESS: 'GET_PACKAGES_SUCCESS', FAIL: 'GET_PACKAGES_FAIL'};
// export const PING = {REQUEST: 'PING_REQUEST', SUCCESS: 'PING_SUCCESS', FAIL: 'PING_FAIL'};

/* Base URL for fetch commands */
export const BASEURL = 'http://www.josephpboyle.com/api/myapi.php/';
//const API_KEY = 'AIzaSyAzvggwVpvJ1pngsjQKJ84FcY8v07C8dNA';
//const googleURL = 'https://www.googleapis.com/upload/storage/v1/b/www.joebochill.com/';



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
        //         fetch(BASEURL+'ping', {
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

/* Retrieves List of Tips-of-the-month */
export function getTips(){
    return (dispatch) => {
        dispatch({type: GET_TIPS.REQUEST});
        return fetch(BASEURL+'tips')
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

/* Retrives list of 19th-hole blog posts */
export function getBlogs(){
    return (dispatch) => {
        dispatch({type: GET_BLOGS.REQUEST});
        return fetch(BASEURL+'blogs')
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

/* Retrieves List of available lesson packages and prices */
export function getPackages(token){
    return (dispatch) => {
        return fetch(BASEURL+'packages', { 
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


/* Check if the request failed because of an expired token */
export function checkTimeout(response, dispatch){
    // If we get a failed API call, check if our authentication needs to be re-upped
    const error = parseInt(response.headers.get('Error'),10);
    if(error && (error >= 400200 && error <= 400212) && dispatch){
        dispatch({type:TOKEN_TIMEOUT});
    }
}

/* Dispatch a failure action for the supplied action type */
export function failure(type, response){
    console.log(response.headers.get('Error'));
    console.log(response.headers.get('Message'));
    return{
        type: type,
        response: response,
        error: response.headers.get('Error')
    }
}

/* Dispatch a success action for the supplied action type */
export function success(type, data=null){
    return{
        type: type,
        data: data
    }
}

