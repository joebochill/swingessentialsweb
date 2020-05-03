import { combineReducers } from 'redux';
import { VerifyResetReducer } from './verifyReset';
import { StatusState } from '../../../__types__';
import { ResetPasswordReducer } from './resetPassword';
import { ChangePasswordReducer } from './changePassword';
import { ValidatePasswordReducer } from './validatePassword';
import { AuthenticationReducer } from './authentication';
import { TipsReducer } from './tips';
import { BlogsReducer } from './blogs';

export const StatusReducer = combineReducers<StatusState>({
    verifyReset: VerifyResetReducer,
    changePassword: ChangePasswordReducer,
    resetPassword: ResetPasswordReducer,
    validatePassword: ValidatePasswordReducer,
    authentication: AuthenticationReducer,
    tips: TipsReducer,
    blogs: BlogsReducer,
});
