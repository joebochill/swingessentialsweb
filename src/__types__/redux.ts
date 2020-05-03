import { Status, UserRole, APIState } from '.';
import { Lesson, Tip, User, Blog, Pro, Package } from './data';

/*
    REDUX STATES TYPES
*/
export type GeneralState = {
    drawerOpen: boolean;
};

// API Reducers
export type StatusState = {
    verifyReset: Status;
    changePassword: Status;
    resetPassword: Status;
    validatePassword: Status;
};

// Data Reducers
export type AuthState = {
    token: string | null;
    admin: boolean;
    role: UserRole;
    modalWarning: boolean;
    failCount: number;
    pending: boolean;
    initialLoaded: boolean;
};
export type LessonsState = {
    loading: boolean;
    pending: Lesson[];
    closed: Lesson[];
    redeemPending: boolean;
    redeemSuccess: boolean;
    redeemError: number | null;
    selected: Lesson | null;
};
export type TipsState = {
    loading: boolean;
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
    loading: boolean;
    blogList: Blog[];
};
export type ProsState = {
    loading: boolean;
    prosList: Pro[];
};
export type PackagesState = {
    list: Package[];
    loading: boolean;
};
export type RegistrationState = {
    pending: boolean;
    userAvailable: boolean;
    // lastUserChecked: string;
    emailAvailable: boolean;
    // lastEmailChecked: string;
    success: boolean;
    emailVerified: boolean;
    error: number;
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
