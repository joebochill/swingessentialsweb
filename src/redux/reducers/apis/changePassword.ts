import { Status } from '../../../__types__';
import { CHANGE_PASSWORD, RESET_API_STATUS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: {
        currentValid: 'initial',
    },
};

export const ChangePasswordReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case CHANGE_PASSWORD.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };
        case CHANGE_PASSWORD.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case CHANGE_PASSWORD.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        }
        case RESET_API_STATUS.CHANGE_PASSWORD:
            return initialAppState;
        default:
            return state;
    }
};
