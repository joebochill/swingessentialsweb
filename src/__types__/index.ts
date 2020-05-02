export type UserRole = 'administrator' | 'anonymous' | 'customer' | 'pending';
export type LessonType = 'in-person' | 'single';
export type SwingType = 'dtl' | 'fo';
export type HandednessType = 'right' | 'left';
export type Credentials = {
    username: string;
    password: string;
};

export type Blog = {
    id: string | number;
    date: string;
    title: string;
    body: string;
};
export type Lesson = {
    dtl_swing: string;
    fo_swing: string;
    request_date: string;
    request_id: number;
    request_notes: string;
    request_url: string;
    response_notes: string;
    response_status: 'good' | 'bad';
    response_video: string;
    type: LessonType;
    username?: string;
    viewed: number | boolean;
};
export type Package = {
    // TODO: update API to return proper types for numbers
    id: string | number;
    name: string;
    description: string;
    shortcode: string;
    count: string | number;
    duration: string | number;
    price: string | number;
    app_sku: string;
};
export type Tip = {
    id: string | number;
    date: string;
    title: string;
    video: string;
    comments: string;
};
export type Pro = {
    id: string;
    name: string;
    title?: string;
    bio: string;
    image: string;
    imageSize?: string;
    imagePosition?: string;
};
export type User = {
    username: string;
    first: string;
    last: string;
};

// Redux State Types
export type GeneralState = {
    drawerOpen: boolean;
};
export type AuthState = {
    token: string | null;
    admin: boolean;
    role: UserRole;
    modalWarning: boolean;
    failCount: number;
    pending: boolean;
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
    image?: string;
    password: {
        pending: boolean;
        codeValid: boolean;
        resetUser: string;
        resetToken: string;
        error: number;
        resetSuccess: boolean;
    };
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

export type AppState = {
    app: GeneralState;
    auth: AuthState;
    user: UserDataState;
    users: UsersState;
    blogs: BlogsState;
    tips: TipsState;
    pros: ProsState;
    lessons: LessonsState;
    registration: RegistrationState;
};
