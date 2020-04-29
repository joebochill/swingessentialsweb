import { success, failure } from '../../api/http-helper';
import { btoa, atob } from '../../utilities/base64';
import * as ACTIONS from './types';
import { AUTH, BASEURL } from '../../constants';
// import { loadLessons } from './LessonActions';
// import { loadTips } from './TipActions';
// import { loadCredits } from './CreditActions';
// import { loadBlogs } from './BlogActions';
// import { loadSettings } from './SettingsActions';
import { ThunkDispatch } from 'redux-thunk';
import { Credentials } from '../../__types__';
import { HttpRequest } from '../../api/http';
// import { Logger } from '../../utilities/logging';
// import * as Keychain from 'react-native-keychain';

export function requestLogin(userCredentials: Credentials) {
    return (dispatch: ThunkDispatch<any, void, any>): Promise<void> => {
        dispatch({ type: ACTIONS.LOGIN.REQUEST });
        return fetch(`${BASEURL}/${ACTIONS.LOGIN.API}`, {
            headers: {
                [AUTH]: `Basic ${btoa(userCredentials.username)}.${btoa(userCredentials.password)}`,
            },
        })
            .then((response) => {
                switch (response.status) {
                    case 200: {
                        const token = response.headers.get('Token');
                        response
                            .json()
                            .then((json) => {
                                dispatch(success(ACTIONS.LOGIN.SUCCESS, { ...json, token: token }));
                            })
                            .then(() => {
                                // dispatch(loadUserContent());
                            });
                        break;
                    }
                    default:
                        dispatch(failure(ACTIONS.LOGIN.FAILURE, response, 'Login'));
                        break;
                }
            })
            .catch((error: Error) => {
                // TODO Log an error
                console.error('Encountered an error', error.message);
                dispatch(failure(ACTIONS.LOGIN.FAILURE, null, 'Login'));
            });
    };
}
/* clears the current authentication token */
export function requestLogout() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.LOGOUT.REQUEST });
        HttpRequest.get(ACTIONS.LOGOUT.API)
            .withFullResponse()
            .onSuccess(() => {
                dispatch(success(ACTIONS.LOGOUT.SUCCESS));
                // dispatch(loadTips());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.LOGOUT.FAILURE, response, 'Logout'));
            })
            .request();
    };
}

export function refreshToken() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REFRESH_TOKEN.REQUEST });
        HttpRequest.get(ACTIONS.REFRESH_TOKEN.API)
            .withFullResponse()
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                dispatch(success(ACTIONS.REFRESH_TOKEN.SUCCESS, { token }));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.REFRESH_TOKEN.FAILURE, response, 'TokenRefresh'));
            })
            .request();
    };
}

export function setToken(token: string) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        const exp = JSON.parse(atob(token.split('.')[1])).exp;
        const expired = exp < Date.now() / 1000;
        if (expired) {
            // TODO: Log an error
        }
        dispatch({ type: ACTIONS.SET_TOKEN.REQUEST, payload: { token: expired ? null : token } });
        // dispatch(loadUserContent());
    };
}

export function checkToken() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.CHECK_TOKEN.REQUEST });
        HttpRequest.get(ACTIONS.CHECK_TOKEN.API)
            .withFullResponse()
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                if (token) {
                    dispatch({ type: ACTIONS.SET_TOKEN.REQUEST, payload: { token } });
                    // dispatch(loadUserContent());
                }
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.CHECK_TOKEN.FAILURE, response, 'Check Token'));
            })
            .request();
    };
}

// export function checkToken(token){
//     return (dispatch) => {
//         fetch(BASEURL+'checkToken', {
//             headers: {
//                 [AUTH]: 'Bearer ' + token
//             }
//         })
//         .then((response) => {
//             switch(response.status){
//                 case 200:
//                     const token = response.headers.get('Token');
//                     if(token){
//                         dispatch(success(CHECK_TOKEN.SUCCESS, {token: token}));
//                     }
//                     break;
//                 default:
//                     checkTimeout(response, dispatch);
//             }
//         })
//         .catch((error) => {
//             logLocalError('116: Promise Error: checking token');
//         });
//     }
// }

// export function loadUserContent() {
//     return (dispatch: ThunkDispatch<any, void, any>) => {
//         // dispatch({type:DATA_FROM_TOKEN.REQUEST});
//         dispatch(loadLessons());
//         dispatch(loadCredits());
//         dispatch(loadSettings());
//         dispatch(loadTips());
//         dispatch(loadBlogs());
//     };
// }
