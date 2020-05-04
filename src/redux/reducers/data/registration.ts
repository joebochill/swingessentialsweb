import { RegistrationState } from '../../../__types__';

const initialState: RegistrationState = {
    // pending: false,
    // userAvailable: true,
    // emailAvailable: true,
    // success: false,
    // emailVerified: false,
    // error: 0,
};
export const RegistrationReducer = (state = initialState, action: any): RegistrationState => {
    switch (action.type) {
        default:
            return state;
    }
};
