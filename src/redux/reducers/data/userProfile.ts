import { LOGOUT, GET_USER_PROFILE, TOKEN_TIMEOUT } from '../../actions/types';
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
export const UserProfileReducer = (state = initialState, action: any): UserDataState => {
    switch (action.type) {
        case GET_USER_PROFILE.SUCCESS:
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
        case GET_USER_PROFILE.FAILURE:
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
