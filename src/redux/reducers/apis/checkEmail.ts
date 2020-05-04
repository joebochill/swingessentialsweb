import { Status } from '../../../__types__';
import { CHECK_EMAIL, RESET_API_STATUS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const CheckEmailReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case CHECK_EMAIL.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case CHECK_EMAIL.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case CHECK_EMAIL.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        }
        case RESET_API_STATUS.REGISTRATION_CHECKS:
            return initialAppState;
        default:
            return state;
    }
};
