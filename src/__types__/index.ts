export type UserRole = 'administrator' | 'anonymous' | 'customer' | 'pending';
export type LessonType = 'in-person' | 'single';
export type SwingType = 'dtl' | 'fo';
export type HandednessType = 'right' | 'left';
export type Credentials = {
    username: string;
    password: string;
};
export type APICallStatus = 'initial' | 'loading' | 'failed' | 'success';
export type APIStatus = {
    initialized: boolean;
    requestStatus: APICallStatus;
    message: string;
    code: number | null;
    extra: any;
};

export * from './data';
export * from './redux';
