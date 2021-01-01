import { LOGIN, LOGOUT, GET_USER_DATA, TOKEN_TIMEOUT, CREATE_ACCOUNT } from '../../actions/types';
import { ScoreRange, UserDataState } from '../../../__types__';

const initialState: UserDataState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    // phone: '',
    goals: '',
    birthday: '',
    average: '',
    joined: 0,
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
                location: action.payload.personal.location,
                // phone: action.payload.personal.phone,
                goals: action.payload.personal.goals,
                birthday: action.payload.personal.birthday,
                average: !isNaN(parseInt(action.payload.personal.average, 10))
                    ? (parseInt(action.payload.personal.average, 10) as ScoreRange)
                    : '',
                joined: action.payload.personal.joined,
            };
        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                username: action.payload.personal.username,
                email: action.payload.personal.email,
                joined: Date.now() / 1000,
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
