import { UserRole, User } from '../__types__';

export const getUserRole = (token: string): UserRole => {
    if (!token) {
        return 'anonymous';
    }
    return JSON.parse(atob(token.split('.')[1])).role;
};

export const sortUsers =
    (prop: keyof User) =>
    (userA: User, userB: User): number =>
        userA[prop].toLowerCase() < userB[prop].toLowerCase() ? -1 : 1;
