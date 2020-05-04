import { AuthenticationAPI } from '../../../__types__';
import {
    INITIAL_LOAD,
    LOGIN,
    REFRESH_TOKEN,
    CREATE_ACCOUNT,
    SET_TOKEN,
    UPDATE_USER_CREDENTIALS,
    RESET_USER_PASSWORD,
    LOGOUT,
    TOKEN_TIMEOUT,
    RESET_API_STATUS,
} from '../../actions/types';

const initialAppState: AuthenticationAPI = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: {
        failures: 0,
    },
};

export const AuthenticationReducer = (state = initialAppState, action: any): AuthenticationAPI => {
    switch (action.type) {
        case INITIAL_LOAD:
            return {
                ...state,
                initialized: true,
            };
        case LOGIN.REQUEST:
        case REFRESH_TOKEN.REQUEST: {
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
            };
        }
        case LOGIN.SUCCESS:
        case CREATE_ACCOUNT.SUCCESS:
        case SET_TOKEN.REQUEST:
        case REFRESH_TOKEN.SUCCESS:
        case UPDATE_USER_CREDENTIALS.SUCCESS:
        case RESET_USER_PASSWORD.SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: {
                    failures: 0,
                },
            };
        }
        case LOGIN.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: {
                    failures: state.extra.failures + 1,
                },
            };
        }
        case REFRESH_TOKEN.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
            };
        }
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: {
                    failures: 0,
                },
            };
        }
        case RESET_API_STATUS.LOGIN_FAILURES:
            return {
                ...state,
                extra: {
                    failures: 0,
                },
            };
        default:
            return state;
    }
};
