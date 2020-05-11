import {
    UserRole,
    BasicAPIStatus,
    BasicAPICheckStatus,
    ValidateStatus,
    VerifyStatus,
    AuthenticationStatus,
    DiscountStatus,
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
    discount: DiscountStatus;
    getCredits: BasicAPIStatus;
    getUserData: BasicAPIStatus;
    getUserSettings: BasicAPIStatus;
    loadLessons: BasicAPIStatus;
    loadUsers: BasicAPIStatus;
    packages: BasicAPIStatus;
    pros: BasicAPIStatus;
    purchaseCredits: BasicAPIStatus;
    redeemLessons: BasicAPIStatus;
    resetPassword: BasicAPIStatus;
    submitLesson: BasicAPIStatus;
    tips: BasicAPIStatus;
    updateUserData: BasicAPIStatus;
    updateUserSettings: BasicAPIStatus;
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
};
export type BlogsState = {
    blogList: Blog[];
};
export type ProsState = {
    prosList: Pro[];
};
export type PackagesState = {
    list: Package[];
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
    credits: CreditsState;
    blogs: BlogsState;
    lessons: LessonsState;
    packages: PackagesState;
    pros: ProsState;
    registration: RegistrationState;
    settings: UserSettingsState;
    tips: TipsState;
    user: UserDataState;
    users: UsersState;
};
