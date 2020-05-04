import { Status } from '../../../__types__';
import { RESET_USER_PASSWORD } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const ResetPasswordReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case RESET_USER_PASSWORD.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case RESET_USER_PASSWORD.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case RESET_USER_PASSWORD.FAILURE: {
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
