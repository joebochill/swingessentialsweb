import { AuthenticationStatus } from '../../../__types__';
import {
    INITIAL_LOAD,
    LOGIN,
    REFRESH_TOKEN,
    SET_TOKEN,
    UPDATE_USER_CREDENTIALS,
    CREATE_ACCOUNT,
    RESET_USER_PASSWORD,
    LOGOUT,
    TOKEN_TIMEOUT,
} from '../../actions/types';

const initialState: AuthenticationStatus = {
    initialized: false,
    status: 'initial',
    code: null,
    data: {
        failures: 0,
    },
};
export const AuthenticationReducer = (state = initialState, action: any): AuthenticationStatus => {
    switch (action.type) {
        /* Authentication */
        case INITIAL_LOAD:
            return {
                ...state,
                initialized: true,
            };
        case LOGIN.REQUEST:
        case REFRESH_TOKEN.REQUEST: {
            return {
                ...state,
                status: 'loading',
                code: null,
            };
        }
        case LOGIN.SUCCESS:
        case SET_TOKEN.REQUEST:
        case REFRESH_TOKEN.SUCCESS:
        case UPDATE_USER_CREDENTIALS.SUCCESS: {
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    failures: 0,
                },
            };
        }

        case LOGIN.FAILURE: {
            return {
                ...state,
                status: 'failed',
                code: null,
                data: {
                    failures: state.data.failures + 1,
                },
            };
        }
        case REFRESH_TOKEN.FAILURE: {
            return {
                ...state,
                status: 'failed',
                code: null,
            };
        }
        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    failures: 0,
                },
            };
        case RESET_USER_PASSWORD.REQUEST:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    failures: 0,
                },
            };
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT: {
            return {
                ...state,
                status: 'failed',
                code: null,
                data: {
                    failures: 0,
                },
                // blogs: starterState,
                // loadLessons: starterState,
                // redeemLessons: starterState,
                // tips: starterState,
            };
        }
        case LOGIN.RESET:
            return {
                ...state,
                data: {
                    failures: 0,
                },
            };
        default:
            return state;
    }
};
