import { LOGIN, LOGOUT, SET_TOKEN, TOKEN_TIMEOUT, REFRESH_TOKEN } from '../redux/actions/types';
import { ASYNC_PREFIX } from '../constants';

export let TOKEN: string | null = null;
function _setToken(newToken: string | null) {
    TOKEN = newToken;
}

// @ts-ignore
export const saveAuthToken = store => next => action => {
    if (action.type === LOGIN.SUCCESS || action.type === SET_TOKEN.REQUEST || action.type === REFRESH_TOKEN.SUCCESS) {
        _setToken(action.payload.token);
        if (action.payload.token !== null) {
            localStorage.setItem(ASYNC_PREFIX + 'token', action.payload.token);
        }
        else localStorage.removeItem(ASYNC_PREFIX + 'token');
    } else if (
        action.type === LOGOUT.SUCCESS ||
        action.type === LOGOUT.FAILURE ||
        action.type === LOGIN.FAILURE ||
        action.type === TOKEN_TIMEOUT
    ) {
        _setToken(null);
        localStorage.removeItem(ASYNC_PREFIX + 'token');
    }
    // continue processing this action
    return next(action);
};