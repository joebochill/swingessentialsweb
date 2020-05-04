import { Status } from '../../../__types__';
import { CHECK_USERNAME, RESET_API_STATUS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const CheckUsernameReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case CHECK_USERNAME.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case CHECK_USERNAME.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case CHECK_USERNAME.FAILURE: {
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
