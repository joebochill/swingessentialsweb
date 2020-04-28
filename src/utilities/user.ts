import { UserRole } from "../__types__";

export const getUserRole = (token: string): UserRole => {
    if (!token) {
        return 'anonymous';
    } else {
        return JSON.parse(atob(token.split('.')[1])).role;
    }
};