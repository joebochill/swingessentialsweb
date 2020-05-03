import {
    LOGIN,
    LOGOUT,
    CREATE_ACCOUNT,
    SET_TOKEN,
    REFRESH_TOKEN,
    TOKEN_TIMEOUT,
    UPDATE_USER_CREDENTIALS,
    RESET_USER_PASSWORD,
    CHANGE_PASSWORD,
} from '../../actions/types';
import { getUserRole } from '../../../utilities/user';
import { AuthState } from '../../../__types__';

const initialState: AuthState = {
    token: null,
    admin: false,
    role: 'anonymous',
    modalWarning: false,
    // failCount: 0,
    // pending: false,
    // initialLoaded: false,
    // changePassword: {
    //     currentValidated: 'initial',
    //     result: 'initial',
    // },
};

export const AuthReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        // case INITIAL_LOAD: {
        //     return {
        //         ...state,
        //         initialLoaded: true,
        //     };
        // }
        // case LOGIN.REQUEST:
        // case REFRESH_TOKEN.REQUEST:
        //     return {
        //         ...state,
        //         pending: true,
        //     };
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
                token: action.payload.token,
                role: role,
                admin: role === 'administrator',
            };
        }
        case LOGIN.FAILURE:
            return {
                ...state,
                token: null,
                admin: false,
                role: 'anonymous',
            };

        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT:
            return {
                ...state,
                token: null,
                admin: false,
                role: 'anonymous',
            };

        case CHANGE_PASSWORD.SUCCESS: {
            const role = getUserRole(action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                role: role,
                admin: role === 'administrator',
            };
        }
        default:
            return state;
    }
};
