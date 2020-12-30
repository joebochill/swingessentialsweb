import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';

import { HttpRequest } from '../../api/http';
import { success, failure, xhrfailure } from '../../api/http-helper';

export function getUserSettings() {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.GET_SETTINGS.REQUEST });

        void HttpRequest.get(ACTIONS.GET_SETTINGS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_SETTINGS.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_SETTINGS.FAILURE, response as Response, 'GetUserSettings'));
            })
            .request();
    };
}

export function setUserNotifications(data: { subscribe: boolean }) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.SET_USER_NOTIFICATIONS.REQUEST });

        void HttpRequest.put(ACTIONS.SET_USER_NOTIFICATIONS.API)
            .withBody(data)
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.SET_USER_NOTIFICATIONS.SUCCESS, response));
                dispatch(getUserSettings());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.SET_USER_NOTIFICATIONS.FAILURE, response as Response, 'SetUserNotifications'));
            })
            .request();
    };
}

type SetAvatar = {
    useAvatar: 0 | 1;
    avatar: string;
};
export function setUserAvatar(data: SetAvatar) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.CHANGE_AVATAR.REQUEST });

        void HttpRequest.post(ACTIONS.CHANGE_AVATAR.API)
            .withBody(data)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.CHANGE_AVATAR.SUCCESS, body));
                dispatch(getUserSettings());
            })
            .onFailure((response) => {
                dispatch(xhrfailure(ACTIONS.CHANGE_AVATAR.FAILURE, response as XMLHttpRequest));
            })
            .request();
    };
}
