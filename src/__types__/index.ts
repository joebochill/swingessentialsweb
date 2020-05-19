import { CurrentDiscount } from './data';

export type UserRole = 'administrator' | 'anonymous' | 'customer' | 'pending';
export type LessonType = 'in-person' | 'single';
export type SwingType = 'dtl' | 'fo';
export type HandednessType = 'right' | 'left';
export type Credentials = {
    username: string;
    password: string;
};
export type LessonPackage = {
    name: string;
    description: string;
    price: number;
    shortcode: string;
};

export type APICallStatus = 'initial' | 'loading' | 'failed' | 'success';
export type BasicAPIStatus = {
    status: APICallStatus;
    code: number | null;
};
export type BasicAPIStatusWithData<T> = {
    status: APICallStatus;
    code: number | null;
    data: T;
};
export type AuthenticationStatus = { initialized: boolean } & BasicAPIStatusWithData<{
    failures: number;
}>;
export type BasicAPICheckStatus = BasicAPIStatusWithData<{
    available: boolean;
}>;
export type ValidateStatus = BasicAPIStatusWithData<{ currentValid: APICallStatus }>;
export type VerifyStatus = BasicAPIStatusWithData<{
    resetUser: string | null;
    resetToken: string | null;
} | null>;
export type DiscountStatus = BasicAPIStatusWithData<CurrentDiscount | null>;

export * from './data';
export * from './redux';
