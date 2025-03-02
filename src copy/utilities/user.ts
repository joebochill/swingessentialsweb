import { UserRole, User } from '../../src/__types__';

export const getUserRole = (token: string): UserRole => {
    if (!token) {
        return 'anonymous';
    }
    return JSON.parse(atob(token.split('.')[1])).role;
};

export const sortUsers =
    (prop: keyof User, secondary: keyof User = 'username') =>
    (userA: User, userB: User): number =>
        userA[prop].toLowerCase() < userB[prop].toLowerCase()
            ? -1
            : userA[prop].toLowerCase() > userB[prop].toLowerCase()
            ? 1
            : userA[secondary].toLowerCase() < userB[secondary].toLowerCase()
            ? -1
            : 1;
