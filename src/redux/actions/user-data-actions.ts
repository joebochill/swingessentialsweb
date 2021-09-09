import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { UserDataState } from '../../__types__';

export function loadUserInfo() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.GET_USER_DATA.REQUEST });

        void HttpRequest.get(ACTIONS.GET_USER_DATA.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_USER_DATA.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_USER_DATA.FAILURE, response as Response, 'userData'));
            })
            .request();
    };
}

/* Retrieves a list of users from the database */
export function getUsers() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_USERS.REQUEST });

        void HttpRequest.get(ACTIONS.GET_USERS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_USERS.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_USERS.FAILURE, response as Response, 'loadUsers'));
            })
            .request();
    };
}

/* Retrieves the profile details for a single user (admin only) */
export function getUserProfile(user: string) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.GET_USER_PROFILE.REQUEST });

        void HttpRequest.get(`${ACTIONS.GET_USER_PROFILE.API}?user=${user}`)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_USER_PROFILE.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_USER_PROFILE.FAILURE, response as Response, 'userProfile'));
            })
            .request();
    };
}

export type UserDataChange = Omit<Omit<Omit<Partial<UserDataState>, 'username'>, 'email'>, 'joined'>;
export function setUserData(data: UserDataChange) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.SET_USER_DATA.REQUEST });

        void HttpRequest.put(ACTIONS.SET_USER_DATA.API)
            .withBody(data)
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.SET_USER_DATA.SUCCESS, response));
                dispatch(loadUserInfo());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.SET_USER_DATA.FAILURE, response as Response, 'SetUserData'));
            })
            .request();
    };
}

export function updateUserPassword(password: string) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.CHANGE_PASSWORD.REQUEST });

        void HttpRequest.put(ACTIONS.CHANGE_PASSWORD.API)
            .withBody({ password: btoa(password) })
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                dispatch(success(ACTIONS.CHANGE_PASSWORD.SUCCESS, { token }));
                dispatch(loadUserInfo());
                // dispatch(requestLogout());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.CHANGE_PASSWORD.FAILURE, response as Response, 'UpdatePassword'));
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

        void HttpRequest.put(ACTIONS.RESET_USER_PASSWORD.API)
            .withExplicitToken(data.token)
            .withBody(data)
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                dispatch(success(ACTIONS.RESET_USER_PASSWORD.SUCCESS, { token }));
                dispatch(loadUserInfo());
                // dispatch(requestLogout());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.RESET_USER_PASSWORD.FAILURE, response as Response, 'ResetPassword'));
                // dispatch(requestLogout());
            })
            .request();
    };
}
