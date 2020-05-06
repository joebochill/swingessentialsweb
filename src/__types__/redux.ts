import {
    UserRole,
    BasicAPIStatus,
    BasicAPICheckStatus,
    ValidateStatus,
    VerifyStatus,
    AuthenticationStatus,
} from '.';
import { Lesson, Tip, User, Blog, Pro, Package } from './data';

/*
    REDUX STATES TYPES
*/
export type GeneralState = {
    drawerOpen: boolean;
};

// API Reducers
export type APIStatusState = {
    authentication: AuthenticationStatus;
    blogs: BasicAPIStatus;
    changePassword: BasicAPIStatus;
    checkEmail: BasicAPICheckStatus;
    checkUsername: BasicAPICheckStatus;
    createAccount: BasicAPIStatus;
    getUserData: BasicAPIStatus;
    loadLessons: BasicAPIStatus;
    loadUsers: BasicAPIStatus;
    pros: BasicAPIStatus;
    redeemLessons: BasicAPIStatus;
    resetPassword: BasicAPIStatus;
    tips: BasicAPIStatus;
    updateUserData: BasicAPIStatus;
    validatePassword: ValidateStatus;
    verifyEmail: BasicAPIStatus;
    verifyReset: VerifyStatus;
};

// Data Reducers
export type AuthState = {
    token: string | null;
    admin: boolean;
    role: UserRole;
    modalWarning: boolean;
};
export type LessonsState = {
    pending: Lesson[];
    closed: Lesson[];
    selected: Lesson | null;
};
export type TipsState = {
    tipList: Tip[];
};
export type UserDataState = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    joined: number;
    location?: string;
    phone?: string;
    image?: string;
};
export type UserSettingsState = {
    notifications?: boolean;
};
export type UsersState = {
    list: User[];
};
export type CreditsState = {
    count: number;
    // unlimited: number,
    // unlimitedExpires: number,
    inProgress: boolean;
    success: boolean;
    fail: boolean;
};
export type BlogsState = {
    blogList: Blog[];
};
export type ProsState = {
    prosList: Pro[];
};
export type PackagesState = {
    list: Package[];
    // loading: boolean;
};
export type RegistrationState = {
    // pending: boolean;
    // userAvailable: boolean;
    // emailAvailable: boolean;
    // success: boolean;
    // emailVerified: boolean;
    // error: number;
};

// Overall Redux State
export type AppState = {
    api: APIStatusState;
    app: GeneralState;
    auth: AuthState;
    user: UserDataState;
    users: UsersState;
    blogs: BlogsState;
    tips: TipsState;
    pros: ProsState;
    lessons: LessonsState;
    registration: RegistrationState;
    settings: UserSettingsState;
};
