import { LOGOUT, GET_USERS, TOKEN_TIMEOUT } from '../../actions/types';
import { UsersState } from '../../../__types__';

const initialState: UsersState = {
    list: [],
};
export const UsersReducer = (state = initialState, action: any): UsersState => {
    switch (action.type) {
        case GET_USERS.SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case GET_USERS.FAILURE:
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT:
            return {
                ...state,
                list: [],
            };
        default:
            return state;
    }
};
