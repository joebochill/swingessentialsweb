import { Status, UserRole, APIStatus } from '.';
import { Lesson, Tip, User, Blog, Pro, Package } from './data';

/*
    REDUX STATES TYPES
*/
export type GeneralState = {
    drawerOpen: boolean;
};

export type AuthenticationAPI = Omit<Status, 'extra'> & {
    extra: {
        failures: number;
    };
};
export type RegistrationAPI = Omit<Status, 'extra'> & {
    extra: {
        emailAvailable: APIStatus;
        usernameAvailable: APIStatus;
    };
};
export type CheckAvailable = Omit<Status, 'extra'> & {
    extra: {
        available: boolean;
    };
};
// API Reducers
export type StatusState = {
    verifyReset: Status;
    changePassword: Status;
    resetPassword: Status;
    validatePassword: Status;
    authentication: AuthenticationAPI;
    tips: Status;
    blogs: Status;
    pros: Status;
    loadLessons: Status;
    redeemLessons: Status;
    checkEmail: CheckAvailable;
    checkUsername: CheckAvailable;
    verifyEmail: Status;
    createAccount: Status;
    // register: Status;
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
    app: GeneralState;
    status: StatusState;
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
