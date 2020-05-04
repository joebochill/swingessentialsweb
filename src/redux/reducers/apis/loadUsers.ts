import { Status } from '../../../__types__';
import { GET_USERS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const LoadUsersReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case GET_USERS.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case GET_USERS.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case GET_USERS.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        }
        default:
            return state;
    }
};
