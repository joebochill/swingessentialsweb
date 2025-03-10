import { LessonType } from '.';

export type ScoreRange = '60' | '70' | '80' | '90' | '100' | '150';

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
    price: string;
    app_sku: string;
};
export type Discount = {
    id: number | string;
    description: string;
    code: string;
    type: 'percent' | 'amount';
    value: string;
    expires: string;
    quantity: string;
};
export type Testimonial = {
    username: string;
    first: string;
    last: string;
    location: string;
    joined: string;
    review: string;
};
export type CurrentDiscount = {
    code: string;
    type: 'percent' | 'amount';
    value: string;
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
export type UserRole = 'pending' | 'customer' | 'administrator' | 'other';
export type User = {
    username: string;
    first: string;
    last: string;
    role: UserRole;
};
