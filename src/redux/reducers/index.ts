import { combineReducers } from 'redux';
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
import { APIReducer } from './apis';
import { PackagesReducer } from './data/packages';
import { CreditsReducer } from './data/credits';

export const rootReducer = (): any =>
    combineReducers<AppState>({
        app: GeneralReducer,
        api: APIReducer,
        auth: AuthReducer,
        credits: CreditsReducer,
        user: UserDataReducer,
        users: UsersReducer,
        blogs: BlogsReducer,
        tips: TipsReducer,
        packages: PackagesReducer,
        pros: ProsReducer,
        lessons: LessonsReducer,
        registration: RegistrationReducer,
        settings: UserSettingsReducer,
    });
