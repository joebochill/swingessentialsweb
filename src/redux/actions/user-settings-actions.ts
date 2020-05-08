import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import * as ACTIONS from './types';
import { ThunkDispatch } from 'redux-thunk';

export function getUserNotifications() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.GET_SETTINGS.REQUEST });

        HttpRequest.get(ACTIONS.GET_SETTINGS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_SETTINGS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.SET_USER_NOTIFICATIONS.FAILURE, response, 'GetUserNotifications'));
            })
            .request();
    };
}

export function setUserNotifications(data: { subscribe: boolean }) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.SET_USER_NOTIFICATIONS.REQUEST });

        HttpRequest.put(ACTIONS.SET_USER_NOTIFICATIONS.API)
            .withBody(data)
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.SET_USER_NOTIFICATIONS.SUCCESS, response));
                dispatch(getUserNotifications());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.SET_USER_NOTIFICATIONS.FAILURE, response, 'SetUserNotifications'));
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
