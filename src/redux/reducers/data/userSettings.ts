import { UserSettingsState } from '../../../__types__';

const initialState: UserSettingsState = {
    notifications: true,
};
export const UserSettingsReducer = (state = initialState, action: any): UserSettingsState => {
    switch (action.type) {
        default:
            return state;
    }
};
