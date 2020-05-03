import {
    LOGIN,
    LOGOUT,
    GET_USER_DATA,
    TOKEN_TIMEOUT,
    CREATE_ACCOUNT,
    VERIFY_RESET_PASSWORD_CODE,
    RESET_USER_PASSWORD,
    SET_USER_DATA,
    RESET_SET_USER_DATA,
} from '../actions/types';
import { UserDataState, UserSettingsState } from '../../__types__';

const initialState: UserSettingsState = {
    notifications: true,
    password: {
        pending: false,
        codeValid: false,
        resetUser: '',
        resetToken: '',
        error: -1,
        resetSuccess: false,
    },
    // api: 'initial'
};
export const UserSettingsReducer = (state = initialState, action: any): UserSettingsState => {
    switch (action.type) {
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
        default:
            return state;
    }
};
