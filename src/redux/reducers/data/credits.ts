import { CreditsState } from '../../../__types__';
import { GET_CREDITS, LOGOUT, TOKEN_TIMEOUT } from '../../actions/types';

const initialState: CreditsState = {
    count: 0,
};
export const CreditsReducer = (state = initialState, action: any): CreditsState => {
    switch (action.type) {
        case GET_CREDITS.SUCCESS:
            return {
                ...state,
                count: parseInt(action.payload.count, 10) || 0,
            };
        case GET_CREDITS.FAILURE:
        case LOGOUT.SUCCESS:
        case TOKEN_TIMEOUT:
            return {
                ...state,
                count: 0,
            };
        default:
            return state;
    }
};
