import { ThunkDispatch } from 'redux-thunk';
import {
    UserRole,
    BasicAPIStatus,
    BasicAPICheckStatus,
    ValidateStatus,
    VerifyStatus,
    AuthenticationStatus,
    DiscountStatus,
} from '.';
import { Lesson, Tip, User, Blog, Pro, Package, Discount, Testimonial, ScoreRange } from './data';

/* MIDDLEWARE TYPES */
export type ThunkFunction = (dispatch: ThunkDispatch<any, void, any>) => void;

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
    checkDiscount: DiscountStatus;
    getCredits: BasicAPIStatus;
    getDiscounts: BasicAPIStatus;
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
    goals?: string;
    birthday?: string;
    // phone?: string;
    average?: ScoreRange | '';
};
export type UserSettingsState = {
    notifications?: boolean;
    avatar: string;
};
export type UsersState = {
    list: User[];
};
export type CreditsState = {
    count: number;
};
export type DiscountsState = {
    list: Discount[];
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
export type TestimonialsState = {
    list: Testimonial[];
};

// Overall Redux State
export type AppState = {
    api: APIStatusState;
    app: GeneralState;
    auth: AuthState;
    blogs: BlogsState;
    credits: CreditsState;
    discounts: DiscountsState;
    lessons: LessonsState;
    packages: PackagesState;
    pros: ProsState;
    settings: UserSettingsState;
    testimonials: TestimonialsState;
    tips: TipsState;
    user: UserDataState;
    users: UsersState;
};
