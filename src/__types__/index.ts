export type UserRole = 'administrator' | 'anonymous' | 'customer' | 'pending';
export type Credentials = {
    username: string;
    password: string;
};
export type YoutubeVideoStatus = 'malformed' | 'invalid' | 'private' | 'valid';
export type ScoreRange = '60' | '70' | '80' | '90' | '100' | '150';
export type Testimonial = {
    username: string;
    first: string;
    last: string;
    location: string;
    joined: string;
    review: string;
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
