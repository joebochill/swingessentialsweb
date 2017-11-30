import 'whatwg-fetch';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
const baseUrl = 'http://www.josephpboyle.com/api/myapi.php/';

export function requestLogin(userCredentials){
    return (dispatch) => {
        return fetch(baseUrl+'login', { 
            headers: {
                'Authorization': window.btoa(userCredentials.username + ' : ' + userCredentials.password)
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    const token = response.headers.get('Token');
                    response.json()
                    .then((json) => dispatch(loginSuccess({...json,token:token})));
                    break;
                default:
                    dispatch(loginFailure(response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

export function requestLogout(userCredentials){
    return (dispatch) => {
        return fetch(baseUrl+'logout', { 
            headers: {
                'Authorization': window.btoa(userCredentials.username + ' : ' + userCredentials.token)
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(logoutSuccess());
                    break;
                default:
                    dispatch(logoutFailure());
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

function loginSuccess(response){
    return{
        type: LOGIN_SUCCESS,
        data: response
    }
}

function loginFailure(response){
    return{
        type: LOGIN_ERROR,
        response: response.status
    }
}

function logoutSuccess(){
    return{
        type: LOGOUT_SUCCESS
    }
}

function logoutFailure(){
    return{
        type: LOGOUT_ERROR
    }
}