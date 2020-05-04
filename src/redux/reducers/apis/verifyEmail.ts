import { Status } from '../../../__types__';
import { VERIFY_EMAIL } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const VerifyEmailReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case VERIFY_EMAIL.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case VERIFY_EMAIL.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case VERIFY_EMAIL.FAILURE: {
            const error = parseInt(action.error, 10);
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: isNaN(error) ? -1 : error,
                extra: null,
            };
        }
        default:
            return state;
    }
};
