import { createAction } from './utilities';

/* Non-API actions */
// export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const TOKEN_TIMEOUT = 'TOKEN_TIMEOUT';
export const INITIAL_LOAD = 'INITIAL_LOAD';

/* Login Actions */
export const LOGIN = createAction('LOGIN', 'login');
export const LOGOUT = createAction('LOGOUT', 'logout');
export const SET_TOKEN = createAction('SET_TOKEN', '');
export const CHECK_TOKEN = createAction('CHECK_TOKEN', 'checkToken');
export const REFRESH_TOKEN = createAction('REFRESH_TOKEN', 'refresh');

/* User Actions */
export const GET_USER_DATA = createAction('GET_USER_DATA', 'user');
export const GET_USERS = createAction('GET_USERS', 'users');

/* Settings Actions */
export const GET_SETTINGS = createAction('GET_SETTINGS', 'settings');
export const PUT_SETTINGS = createAction('PUT_SETTINGS', 'settings');

/* Lesson Actions */
export const GET_LESSONS = createAction('GET_LESSONS', 'lessons');
export const SUBMIT_LESSON = createAction('SUBMIT_LESSON', 'redeem');
export const MARK_VIEWED = createAction('MARK_LESSON_VIEWED', 'viewed');
export const PUT_LESSON = createAction('PUT_LESSON', 'lesson');

/* Tips Actions */
export const GET_TIPS = createAction('GET_TIPS', 'tips');

/* Blogs Actions */
export const GET_BLOGS = createAction('GET_BLOGS', 'blogs');

/* Pros Actions */
export const GET_PROS = createAction('GET_PROS', 'bios');

/* Package Actions */
export const GET_PACKAGES = createAction('GET_PACKAGES', 'packages');

/* Credits Actions */
export const GET_CREDITS = createAction('GET_CREDITS', 'credits');
export const PURCHASE_CREDITS = createAction('PURCHASE_CREDITS', 'TODO');

/* Registration Actions */
export const CHECK_USERNAME = createAction('CHECK_USERNAME', 'checkUser');
export const CHECK_EMAIL = createAction('CHECK_EMAIL', 'checkEmail');
export const CREATE_ACCOUNT = createAction('CREATE_ACCOUNT', 'user');
export const RESET_PASSWORD_EMAIL = createAction('RESET_PASSWORD_EMAIL', 'reset');
export const VERIFY_EMAIL = createAction('VERIFY_EMAIL', 'verify');
