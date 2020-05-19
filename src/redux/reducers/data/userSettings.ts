import { UserSettingsState } from '../../../__types__';
import { GET_SETTINGS, LOGOUT, TOKEN_TIMEOUT, CREATE_ACCOUNT } from '../../actions/types';

const initialState: UserSettingsState = {
    notifications: undefined,
    avatar: '',
};
export const UserSettingsReducer = (state = initialState, action: any): UserSettingsState => {
    switch (action.type) {
        case GET_SETTINGS.SUCCESS: {
            return {
                ...state,
                notifications: action.payload.subbed,
                avatar: action.payload.avatar,
            };
        }
        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                notifications: true,
            };
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case GET_SETTINGS.FAILURE:
        case TOKEN_TIMEOUT:
        case GET_SETTINGS.RESET:
            return initialState;
        default:
            return state;
    }
};
