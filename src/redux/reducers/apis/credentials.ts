import { ValidateStatus, VerifyStatus } from '../../../__types__';
import { VALIDATE_PASSWORD, VERIFY_RESET_PASSWORD_CODE } from '../../actions/types';

const initialState: ValidateStatus = {
    status: 'initial',
    code: null,
    data: {
        currentValid: 'initial',
    },
};
export const ValidatePasswordReducer = (state = initialState, action: any): ValidateStatus => {
    switch (action.type) {
        case VALIDATE_PASSWORD.REQUEST:
            return {
                ...state,
                status: 'loading',
                code: null,
                data: {
                    currentValid: 'loading',
                },
            };

        case VALIDATE_PASSWORD.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    currentValid: 'success',
                },
            };
        case VALIDATE_PASSWORD.FAILURE: {
            return {
                ...state,
                status: 'failed',
                code: null,
                data: {
                    currentValid: 'failed',
                },
            };
        }
        default:
            return state;
    }
};

const initialVerifyState: VerifyStatus = {
    status: 'initial',
    code: null,
    data: {
        resetUser: '',
        resetToken: null,
    },
};
export const VerifyResetPasswordReducer = (state = initialVerifyState, action: any): VerifyStatus => {
    switch (action.type) {
        case VERIFY_RESET_PASSWORD_CODE.REQUEST:
            return {
                ...state,
                status: 'loading',
                code: null,
                data: null,
            };

        case VERIFY_RESET_PASSWORD_CODE.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    resetUser: action.payload.username,
                    resetToken: action.payload.auth,
                },
            };
        case VERIFY_RESET_PASSWORD_CODE.FAILURE: {
            const errorCode = parseInt(action.error, 10);
            return {
                ...state,
                status: 'failed',
                code: isNaN(errorCode) ? -1 : errorCode,
                data: null,
            };
        }
        default:
            return state;
    }
};
