import {
    LOGIN,
    LOGOUT,
    GET_USER_DATA,
    TOKEN_TIMEOUT,
    CREATE_ACCOUNT,
    VERIFY_RESET_PASSWORD_CODE,
    RESET_USER_PASSWORD,
} from '../actions/types';
import { UserDataState } from '../../__types__';

const initialState: UserDataState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    joined: 0,
    password: {
        pending: false,
        codeValid: false,
        resetUser: '',
        resetToken: '',
        error: -1,
        resetSuccess: false,
    },
};
export const UserDataReducer = (state = initialState, action: any): UserDataState => {
    switch (action.type) {
        case GET_USER_DATA.SUCCESS:
        case LOGIN.SUCCESS:
            return {
                ...state,
                username: action.payload.personal.username,
                firstName: action.payload.personal.first_name,
                lastName: action.payload.personal.last_name,
                email: action.payload.personal.email,
                joined: action.payload.personal.joined,
            };
        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                username: action.payload.personal.username,
                email: action.payload.personal.email,
                joined: Date.now(), //TODO is this right or *1000?
            };
        case VERIFY_RESET_PASSWORD_CODE.REQUEST:
            return {
                ...state,
                password: {
                    ...state.password,
                    pending: true,
                    codeValid: false,
                    resetToken: '',
                    resetUser: '',
                    error: -1,
                },
            };
        case RESET_USER_PASSWORD.REQUEST:
            return {
                ...state,
                password: {
                    ...state.password,
                    pending: true,
                },
            };
        case VERIFY_RESET_PASSWORD_CODE.SUCCESS:
            return {
                ...state,
                password: {
                    ...state.password,
                    pending: false,
                    codeValid: true,
                    resetUser: action.payload.username,
                    resetToken: action.payload.auth,
                    error: -1,
                },
            };
        case VERIFY_RESET_PASSWORD_CODE.FAILURE:
            return {
                ...state,
                password: {
                    ...state.password,
                    pending: false,
                    codeValid: false,
                    resetUser: '',
                    resetToken: '',
                    error: isNaN(parseInt(action.error, 10)) ? -1 : parseInt(action.error, 10),
                },
            };
        case RESET_USER_PASSWORD.SUCCESS:
            return {
                ...state,
                password: {
                    ...state.password,
                    pending: false,
                    resetSuccess: true,
                },
            };
        case RESET_USER_PASSWORD.FAILURE:
            return {
                ...state,
                password: {
                    ...state.password,
                    pending: false,
                    resetSuccess: false,
                },
            };

        case GET_USER_DATA.FAILURE:
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT:
            return {
                ...state,
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                joined: 0,
            };
        default:
            return state;
    }
};
