import { combineReducers } from 'redux';
import { VerifyResetReducer } from './verifyReset';
import { StatusState } from '../../../__types__';
import { ResetPasswordReducer } from './resetPassword';
import { ChangePasswordReducer } from './changePassword';
import { ValidatePasswordReducer } from './validatePassword';

export const StatusReducer = combineReducers<StatusState>({
    verifyReset: VerifyResetReducer,
    changePassword: ChangePasswordReducer,
    resetPassword: ResetPasswordReducer,
    validatePassword: ValidatePasswordReducer,
});
