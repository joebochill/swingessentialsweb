import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

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

export type UserDataChange = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    location?: string;
};
export function setUserData(data: UserDataChange) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.SET_USER_DATA.REQUEST });

        HttpRequest.put(ACTIONS.SET_USER_DATA.API)
            .withBody(data)
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.SET_USER_DATA.SUCCESS, response));
                dispatch(loadUserInfo());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.SET_USER_DATA.FAILURE, response, 'SetUserData'));
            })
            .request();
    };
}

export function updateUserPassword(password: string) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.CHANGE_PASSWORD.REQUEST });

        HttpRequest.put(ACTIONS.CHANGE_PASSWORD.API)
            .withBody({ password: btoa(password) })
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                dispatch(success(ACTIONS.CHANGE_PASSWORD.SUCCESS, { token }));
                // dispatch(loadUserInfo());
                // dispatch(requestLogout());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.CHANGE_PASSWORD.FAILURE, response, 'UpdatePassword'));
                // dispatch(requestLogout());
            })
            .request();
    };
}

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
