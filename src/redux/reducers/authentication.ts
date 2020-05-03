import {
    LOGIN,
    LOGOUT,
    CREATE_ACCOUNT,
    SET_TOKEN,
    REFRESH_TOKEN,
    TOKEN_TIMEOUT,
    UPDATE_USER_CREDENTIALS,
    RESET_USER_PASSWORD,
    RESET_LOGIN_FAIL_COUNT,
    INITIAL_LOAD,
    VALIDATE_PASSWORD,
    CHANGE_PASSWORD,
    RESET_CHANGE_PASSWORD,
} from '../actions/types';
import { getUserRole } from '../../utilities/user';
import { AuthState } from '../../__types__';

const initialState: AuthState = {
    token: null,
    admin: false,
    role: 'anonymous',
    modalWarning: false,
    failCount: 0,
    pending: false,
    initialLoaded: false,
    changePassword: {
        currentValidated: 'initial',
        result: 'initial',
    },
};

export const AuthReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case INITIAL_LOAD: {
            return {
                ...state,
                initialLoaded: true,
            };
        }
        case LOGIN.REQUEST:
        case REFRESH_TOKEN.REQUEST:
            return {
                ...state,
                pending: true,
            };
        case LOGIN.SUCCESS:
        case CREATE_ACCOUNT.SUCCESS:
        case SET_TOKEN.REQUEST:
        case REFRESH_TOKEN.SUCCESS:
        case UPDATE_USER_CREDENTIALS.SUCCESS:
        case RESET_USER_PASSWORD.SUCCESS: {
            const role = getUserRole(action.payload.token);
            return {
                ...state,
                modalWarning: false,
                failCount: 0,
                token: action.payload.token,
                pending: false,
                role: role,
                admin: role === 'administrator',
            };
        }
        case LOGIN.FAILURE:
            return {
                ...state,
                token: null,
                admin: false,
                pending: false,
                role: 'anonymous',
                failCount: state.failCount + 1,
            };
        case REFRESH_TOKEN.FAILURE:
            return {
                ...state,
                pending: false,
            };

        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT:
            return {
                ...state,
                token: null,
                admin: false,
                pending: false,
                role: 'anonymous',
                failCount: 0,
            };
        case RESET_LOGIN_FAIL_COUNT:
            return {
                ...state,
                failCount: 0,
            };
        case VALIDATE_PASSWORD.REQUEST:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    currentValidated: 'pending',
                },
            };
        case VALIDATE_PASSWORD.SUCCESS:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    currentValidated: 'success',
                },
            };
        case VALIDATE_PASSWORD.FAILURE:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    currentValidated: 'failed',
                },
            };
        case CHANGE_PASSWORD.REQUEST:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    result: 'pending',
                },
            };
        case CHANGE_PASSWORD.SUCCESS: {
            const role = getUserRole(action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                pending: false,
                role: role,
                admin: role === 'administrator',
                changePassword: {
                    ...state.changePassword,
                    result: 'success',
                },
            };
        }
        case CHANGE_PASSWORD.FAILURE:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    result: 'failed',
                },
            };
        case RESET_CHANGE_PASSWORD:
            return {
                ...state,
                changePassword: {
                    currentValidated: 'initial',
                    result: 'initial',
                },
            };
        default:
            return state;
    }
};
