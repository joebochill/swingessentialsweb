import { Status } from '../../../__types__';
import { VERIFY_RESET_PASSWORD_CODE } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const VerifyResetReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case VERIFY_RESET_PASSWORD_CODE.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case VERIFY_RESET_PASSWORD_CODE.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: {
                    resetUser: action.payload.username,
                    resetToken: action.payload.auth,
                },
            };
        case VERIFY_RESET_PASSWORD_CODE.FAILURE: {
            const errorCode = parseInt(action.error, 10); //TODO check if this should be from the payload
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: isNaN(errorCode) ? -1 : errorCode,
                extra: null,
            };
        }
        default:
            return state;
    }
};
