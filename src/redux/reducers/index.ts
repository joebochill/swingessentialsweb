import { combineReducers } from 'redux';
// import { CHANGE_PAGE_TITLE, CHANGE_COLOR_FORMAT, TOGGLE_DRAWER } from '../actions';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';
// import { AppActions } from '../actions/actionTypes';
import { AuthReducer } from './data/authentication';
import { AppState } from '../../__types__';
import { GeneralReducer } from './general';
import { UserDataReducer } from './data/userData';
import { BlogsReducer } from './data/blogs';
import { TipsReducer } from './data/tips';
import { ProsReducer } from './data/pros';
import { LessonsReducer } from './data/lessons';
import { UsersReducer } from './data/users';
import { RegistrationReducer } from './data/registration';
import { UserSettingsReducer } from './data/userSettings';
import { StatusReducer } from './apis';

export const rootReducer = (): any =>
    combineReducers<AppState>({
        app: GeneralReducer,
        status: StatusReducer,
        auth: AuthReducer,
        user: UserDataReducer,
        users: UsersReducer,
        blogs: BlogsReducer,
        tips: TipsReducer,
        pros: ProsReducer,
        lessons: LessonsReducer,
        registration: RegistrationReducer,
        settings: UserSettingsReducer,
    });
