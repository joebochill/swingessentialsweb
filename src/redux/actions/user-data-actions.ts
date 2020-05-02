import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';
import { ThunkDispatch } from 'redux-thunk';

export function loadUserInfo() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.GET_BLOGS.REQUEST });

        HttpRequest.get(ACTIONS.GET_USER_DATA.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_USER_DATA.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_USER_DATA.FAILURE, response, 'userData'));
            })
            .request();
    };
}

/* Retrieves user personal data from the database */
// export function getUserData(token) {
//     return (dispatch) => {
//         return fetch(BASEURL + 'user', {
//             headers: {
//                 [AUTH]: 'Bearer ' + token
//             }
//         })
//             .then((response) => {
//                 switch (response.status) {
//                     case 200:
//                         response.json()
//                             .then((json) => dispatch(success(GET_USER_DATA.SUCCESS, json)));
//                         break;
//                     default:
//                         checkTimeout(response, dispatch);
//                         dispatch(failure(GET_USER_DATA.FAIL, response));
//                         break;
//                 }
//             })
//             .catch((error) => console.error(error));
//     }
// }

/* Retrieves a list of users from the database */
export function getUsers() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_USERS.REQUEST });

        HttpRequest.get(ACTIONS.GET_USERS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_USERS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_USERS.FAILURE, response, 'loadUsers'));
            })
            .request();
    };
}

// /* Updates the user personal data in the database */
// export function putUserData(data, token) {
//     return (dispatch) => {
//         return fetch(BASEURL + 'details', {
//             method: 'PUT',
//             headers: {
//                 [AUTH]: 'Bearer ' + token
//             },
//             body: JSON.stringify(data)
//         })
//             .then((response) => {
//                 switch (response.status) {
//                     case 200:
//                         dispatch(success(PUT_USER_DATA.SUCCESS));
//                         dispatch(getUserData(token));
//                         break;
//                     default:
//                         checkTimeout(response, dispatch);
//                         dispatch(failure(PUT_USER_DATA.FAIL, response));
//                         dispatch(getUserData(token));
//                         break;
//                 }
//             })
//             .catch((error) => console.error(error));
//     }
// }
type UserCredentials = {
    username?: string;
    password?: string;
    email?: string;
};
// export function updateUserCredentials(data: UserCredentials) {
//     return (dispatch: ThunkDispatch<any, void, any>): void => {
//         dispatch({ type: ACTIONS.UPDATE_USER_CREDENTIALS.REQUEST });

//         HttpRequest.put(ACTIONS.UPDATE_USER_CREDENTIALS.API)
//             .withBody(data)
//             .onSuccess((body: any) => {
//                 dispatch(success(ACTIONS.UPDATE_USER_CREDENTIALS.SUCCESS, body));
//                 dispatch(loadUserInfo());
//                 // dispatch(requestLogout());
//             })
//             .onFailure((response: Response) => {
//                 dispatch(failure(ACTIONS.UPDATE_USER_CREDENTIALS.FAILURE, response, 'UpdateCredentials'));
//                 // dispatch(requestLogout());
//             })
//             .request();
//     };
// }
type ResetPassword = {
    password: string;
    token: string;
};
export function resetUserPassword(data: ResetPassword) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.RESET_USER_PASSWORD.REQUEST });

        HttpRequest.put(ACTIONS.RESET_USER_PASSWORD.API)
            .withExplicitToken(data.token)
            .withBody(data)
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                dispatch(success(ACTIONS.RESET_USER_PASSWORD.SUCCESS, { token }));
                dispatch(loadUserInfo());
                // dispatch(requestLogout());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.RESET_USER_PASSWORD.FAILURE, response, 'ResetPassword'));
                // dispatch(requestLogout());
            })
            .request();
    };
}

// /* Retrieves user app settings from the database */
// export function getSettings(token) {
//     return (dispatch) => {
//         return fetch(BASEURL + 'settings', {
//             headers: {
//                 [AUTH]: 'Bearer ' + token
//             }
//         })
//             .then((response) => {
//                 switch (response.status) {
//                     case 200:
//                         response.json()
//                             .then((json) => dispatch(success(GET_SETTINGS.SUCCESS, json)));
//                         break;
//                     default:
//                         checkTimeout(response, dispatch);
//                         dispatch(failure(GET_SETTINGS.FAIL, response));
//                         break;
//                 }
//             })
//             .catch((error) => console.error(error));
//     }
// }

// /* Updates the user settings in the database */
// export function putSettings(data, token) {
//     return (dispatch) => {
//         return fetch(BASEURL + 'settings', {
//             method: 'PUT',
//             headers: {
//                 [AUTH]: 'Bearer ' + token
//             },
//             body: JSON.stringify(data)
//         })
//             .then((response) => {
//                 switch (response.status) {
//                     case 200:
//                         dispatch(success(PUT_SETTINGS.SUCCESS));
//                         dispatch(getSettings(token));
//                         break;
//                     default:
//                         checkTimeout(response, dispatch);
//                         dispatch(failure(PUT_SETTINGS.FAIL, response));
//                         dispatch(getSettings(token));
//                         break;
//                 }
//             })
//             .catch((error) => console.error(error));
//     }
// }

// /* Unsubscribes the user from new lesson response emails */
// export function unsubscribe(uid, kid) {
//     return (dispatch) => {
//         dispatch({ type: UNSUBSCRIBE.REQUEST });

//         return fetch(BASEURL + 'unsubscribe?uid=' + uid + '&kid=' + kid)
//             .then((response) => {
//                 switch (response.status) {
//                     case 200:
//                         dispatch(success(UNSUBSCRIBE.SUCCESS));
//                         break;
//                     default:
//                         dispatch(failure(UNSUBSCRIBE.FAIL, response));
//                         break;
//                 }
//             })
//             .catch((error) => console.error(error));
//     }
// }
