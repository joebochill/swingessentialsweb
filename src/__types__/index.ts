export type UserRole = 'administrator' | 'anonymous' | 'customer' | 'pending';


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

export type AppState = {
    app: GeneralState;
    auth: AuthState
};