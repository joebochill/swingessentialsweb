import { combineReducers } from 'redux';
import { VerifyResetReducer } from './verifyReset';
import { StatusState } from '../../../__types__';
import { ResetPasswordReducer } from './resetPassword';
import { ChangePasswordReducer } from './changePassword';
import { ValidatePasswordReducer } from './validatePassword';
import { AuthenticationReducer } from './authentication';
import { TipsReducer } from './tips';
import { BlogsReducer } from './blogs';
import { ProsReducer } from './pros';
import { LoadLessonsReducer } from './loadLessons';
import { RedeemLessonsReducer } from './redeemLessons';
import { CheckUsernameReducer } from './checkUsername';
import { CheckEmailReducer } from './checkEmail';
import { VerifyEmailReducer } from './verifyEmail';
import { CreateAccountReducer } from './createAccount';

export const StatusReducer = combineReducers<StatusState>({
    verifyReset: VerifyResetReducer,
    changePassword: ChangePasswordReducer,
    resetPassword: ResetPasswordReducer,
    validatePassword: ValidatePasswordReducer,
    authentication: AuthenticationReducer,
    tips: TipsReducer,
    blogs: BlogsReducer,
    pros: ProsReducer,
    loadLessons: LoadLessonsReducer,
    redeemLessons: RedeemLessonsReducer,
    checkUsername: CheckUsernameReducer,
    checkEmail: CheckEmailReducer,
    verifyEmail: VerifyEmailReducer,
    createAccount: CreateAccountReducer,
});
