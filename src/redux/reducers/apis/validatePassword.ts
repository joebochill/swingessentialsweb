import { Status } from '../../../__types__';
import { VALIDATE_PASSWORD, RESET_API_STATUS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const ValidatePasswordReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case VALIDATE_PASSWORD.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: {
                    currentValid: 'loading',
                },
            };
        case VALIDATE_PASSWORD.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: {
                    currentValid: 'success',
                },
            };
        case VALIDATE_PASSWORD.FAILURE:
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: {
                    currentValid: 'failed',
                },
            };
        case RESET_API_STATUS.CHANGE_PASSWORD:
            return initialAppState;
        default:
            return state;
    }
};
