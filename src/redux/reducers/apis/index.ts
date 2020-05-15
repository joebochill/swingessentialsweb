import { combineReducers } from 'redux';

import { APIStatusState } from '../../../__types__';
import {
    CREATE_ACCOUNT,
    RESET_USER_PASSWORD,
    GET_BLOGS,
    CHANGE_PASSWORD,
    GET_USER_DATA,
    GET_LESSONS,
    GET_USERS,
    GET_PROS,
    GET_TIPS,
    SET_USER_DATA,
    VERIFY_EMAIL,
    REDEEM_LESSON,
    SET_USER_NOTIFICATIONS,
    GET_SETTINGS,
    GET_PACKAGES,
    GET_CREDITS,
    PURCHASE_CREDITS,
    SUBMIT_LESSON,
    GET_DISCOUNTS,
} from '../../actions/types';

import { simpleReducer } from './simpleReducer';
import { CheckEmailReducer, CheckUsernameReducer } from './registration';
import { ValidatePasswordReducer, VerifyResetPasswordReducer } from './credentials';
import { AuthenticationReducer } from './authentication';
import { CheckDiscountReducer } from './check-discounts';

export const APIReducer = combineReducers<APIStatusState>({
    authentication: AuthenticationReducer,
    blogs: simpleReducer(GET_BLOGS),
    changePassword: simpleReducer(CHANGE_PASSWORD),
    checkEmail: CheckEmailReducer,
    checkUsername: CheckUsernameReducer,
    createAccount: simpleReducer(CREATE_ACCOUNT),
    checkDiscount: CheckDiscountReducer,
    getCredits: simpleReducer(GET_CREDITS),
    getDiscounts: simpleReducer(GET_DISCOUNTS),
    getUserData: simpleReducer(GET_USER_DATA),
    getUserSettings: simpleReducer(GET_SETTINGS),
    loadLessons: simpleReducer(GET_LESSONS),
    loadUsers: simpleReducer(GET_USERS),
    packages: simpleReducer(GET_PACKAGES),
    pros: simpleReducer(GET_PROS),
    purchaseCredits: simpleReducer(PURCHASE_CREDITS),
    redeemLessons: simpleReducer(REDEEM_LESSON),
    resetPassword: simpleReducer(RESET_USER_PASSWORD),
    submitLesson: simpleReducer(SUBMIT_LESSON),
    tips: simpleReducer(GET_TIPS),
    updateUserData: simpleReducer(SET_USER_DATA),
    updateUserSettings: simpleReducer(SET_USER_NOTIFICATIONS),
    validatePassword: ValidatePasswordReducer,
    verifyEmail: simpleReducer(VERIFY_EMAIL),
    verifyReset: VerifyResetPasswordReducer,
});
