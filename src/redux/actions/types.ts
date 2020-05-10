import { createAction } from './utilities';

/* Non-API actions */
export const TOKEN_TIMEOUT = 'TOKEN_TIMEOUT';
export const INITIAL_LOAD = 'INITIAL_LOAD';

/* Login Actions */
export const LOGIN = createAction('LOGIN', 'login');
export const LOGOUT = createAction('LOGOUT', 'logout');
export const SET_TOKEN = createAction('SET_TOKEN', '');
export const CHECK_TOKEN = createAction('CHECK_TOKEN', 'checkToken');
export const REFRESH_TOKEN = createAction('REFRESH_TOKEN', 'refresh');
export const VALIDATE_PASSWORD = createAction('VALIDATE_PASSWORD', 'validate');
export const CHANGE_PASSWORD = createAction('CHANGE_PASSWORD', 'credentials');

/* User Actions */
export const GET_USER_DATA = createAction('GET_USER_DATA', 'user');
export const SET_USER_DATA = createAction('SET_USER_DATA', 'details');
export const GET_USERS = createAction('GET_USERS', 'users');
export const RESET_USER_PASSWORD = createAction('RESET_USER_PASSWORD', 'credentials');
export const UPDATE_USER_CREDENTIALS = createAction('UPDATE_USER_CREDENTIALS', 'credentials');
export const SET_USER_NOTIFICATIONS = createAction('SET_USER_NOTIFICATIONS', 'settings');

/* Settings Actions */
export const GET_SETTINGS = createAction('GET_SETTINGS', 'settings');
export const PUT_SETTINGS = createAction('PUT_SETTINGS', 'settings');

/* Lesson Actions */
export const GET_LESSONS = createAction('GET_LESSONS', 'lessons');
export const SUBMIT_LESSON = createAction('SUBMIT_LESSON', 'redeem');
export const MARK_VIEWED = createAction('MARK_LESSON_VIEWED', 'viewed');
export const PUT_LESSON = createAction('PUT_LESSON', 'lesson');
export const REDEEM_LESSON = createAction('REDEEM_LESSON', 'redeem');
// TODO
export const SET_SELECTED_LESSON = 'SET_SELECTED_LESSON';

/* Tips Actions */
export const GET_TIPS = createAction('GET_TIPS', 'tips');
export const UPDATE_TIP = createAction('UPDATE_TIP', 'tip');
export const ADD_TIP = createAction('ADD_TIP', 'tip');
export const REMOVE_TIP = createAction('REMOVE_TIP', 'removetip');

/* Blogs Actions */
export const GET_BLOGS = createAction('GET_BLOGS', 'blogs');
export const UPDATE_BLOG = createAction('UPDATE_BLOG', 'blog');
export const ADD_BLOG = createAction('ADD_BLOG', 'blog');
export const REMOVE_BLOG = createAction('REMOVE_BLOG', 'removeblog');

/* Pros Actions */
export const GET_PROS = createAction('GET_PROS', 'bios');
export const UPDATE_PRO = createAction('UPDATE_PRO', 'bio');
export const ADD_PRO = createAction('ADD_PRO', 'bio');
export const REMOVE_PRO = createAction('REMOVE_PRO', 'removebio');

/* Package Actions */
export const GET_PACKAGES = createAction('GET_PACKAGES', 'packages');
export const CHECK_DISCOUNT = createAction('CHECK_DISCOUNT', 'checkCoupon');

/* Credits Actions */
export const GET_CREDITS = createAction('GET_CREDITS', 'credits');
export const PURCHASE_CREDITS = createAction('PURCHASE_CREDITS', 'executepayment');

/* Registration Actions */
export const CHECK_USERNAME = createAction('CHECK_USERNAME', 'checkUser');
export const CHECK_EMAIL = createAction('CHECK_EMAIL', 'checkEmail');
export const CREATE_ACCOUNT = createAction('CREATE_ACCOUNT', 'user');
export const RESET_PASSWORD_EMAIL = createAction('RESET_PASSWORD_EMAIL', 'reset');
export const VERIFY_EMAIL = createAction('VERIFY_EMAIL', 'verify');
export const VERIFY_RESET_PASSWORD_CODE = createAction('VERIFY_RESET_PASSWORD_CODE', 'verify');
