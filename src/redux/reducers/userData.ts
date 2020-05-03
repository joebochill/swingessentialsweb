import {
    LOGIN,
    LOGOUT,
    GET_USER_DATA,
    TOKEN_TIMEOUT,
    CREATE_ACCOUNT,
    SET_USER_DATA,
    RESET_SET_USER_DATA,
} from '../actions/types';
import { UserDataState } from '../../__types__';

const initialState: UserDataState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phone: '',
    joined: 0,
    update: 'unset',
};
export const UserDataReducer = (state = initialState, action: any): UserDataState => {
    switch (action.type) {
        case SET_USER_DATA.REQUEST:
            return {
                ...state,
                update: 'pending',
            };
        case GET_USER_DATA.SUCCESS:
        case LOGIN.SUCCESS:
            return {
                ...state,
                username: action.payload.personal.username,
                firstName: action.payload.personal.first_name,
                lastName: action.payload.personal.last_name,
                email: action.payload.personal.email,
                location: action.payload.personal.location,
                phone: action.payload.personal.phone,
                image: action.payload.personal.image,
                joined: action.payload.personal.joined,
            };
        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                username: action.payload.personal.username,
                email: action.payload.personal.email,
                joined: Date.now(), //TODO is this right or *1000?
            };
        case SET_USER_DATA.SUCCESS:
            return {
                ...state,
                update: 'success',
            };
        case SET_USER_DATA.FAILURE:
            return {
                ...state,
                update: 'error',
            };
        case RESET_SET_USER_DATA:
            return {
                ...state,
                update: 'unset',
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
