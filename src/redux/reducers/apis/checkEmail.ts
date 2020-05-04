import { CheckAvailable } from '../../../__types__';
import { CHECK_EMAIL, RESET_API_STATUS } from '../../actions/types';

const initialAppState: CheckAvailable = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: {
        available: false,
    },
};

export const CheckEmailReducer = (state = initialAppState, action: any): CheckAvailable => {
    switch (action.type) {
        case CHECK_EMAIL.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: {
                    available: false,
                },
            };

        case CHECK_EMAIL.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: {
                    available: action.payload.available,
                },
            };
        case CHECK_EMAIL.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: {
                    available: false,
                },
            };
        }
        case RESET_API_STATUS.REGISTRATION_CHECKS:
            return initialAppState;
        default:
            return state;
    }
};
