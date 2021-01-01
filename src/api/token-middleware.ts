import {
    LOGIN,
    LOGOUT,
    SET_TOKEN,
    TOKEN_TIMEOUT,
    REFRESH_TOKEN,
    CREATE_ACCOUNT,
    RESET_USER_PASSWORD,
    CHANGE_PASSWORD,
} from '../redux/actions/types';
import { ASYNC_PREFIX } from '../constants';

export let TOKEN: string | null = null;
const setToken = (newToken: string | null): void => {
    TOKEN = newToken;
};

// eslint-disable-next-line
export const saveAuthToken = (store: any) => (next: any) => (action: any) => {
    if (
        action.type === LOGIN.SUCCESS ||
        action.type === SET_TOKEN.REQUEST ||
        action.type === REFRESH_TOKEN.SUCCESS ||
        action.type === CREATE_ACCOUNT.SUCCESS ||
        action.type === RESET_USER_PASSWORD.SUCCESS ||
        action.type === CHANGE_PASSWORD.SUCCESS
    ) {
        setToken(action.payload.token);
        if (action.payload.token !== null) {
            localStorage.setItem(`${ASYNC_PREFIX}token`, action.payload.token);
        } else localStorage.removeItem(`${ASYNC_PREFIX}token`);
    } else if (
        action.type === LOGOUT.SUCCESS ||
        action.type === LOGOUT.FAILURE ||
        action.type === LOGIN.FAILURE ||
        action.type === TOKEN_TIMEOUT
    ) {
        setToken(null);
        localStorage.removeItem(`${ASYNC_PREFIX}token`);
    }
    // continue processing this action
    return next(action);
};
