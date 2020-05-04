export type UserRole = 'administrator' | 'anonymous' | 'customer' | 'pending';
export type LessonType = 'in-person' | 'single';
export type SwingType = 'dtl' | 'fo';
export type HandednessType = 'right' | 'left';
export type Credentials = {
    username: string;
    password: string;
};
export type APIStatus = 'initial' | 'loading' | 'failed' | 'success';
export type Status = {
    initialized: boolean;
    requestStatus: APIStatus;
    message: string;
    code: number | null;
    extra: any;
};

export * from './data';
export * from './redux';
