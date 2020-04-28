import { GeneralState } from '../../__types__';

const initialAppState: GeneralState = {
    drawerOpen: false,
};
export const GeneralReducer = (state = initialAppState, action: any): GeneralState => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return {
                ...state,
                drawerOpen: true,
            };
        case 'CLOSE_DRAWER':
            return {
                ...state,
                drawerOpen: false,
            };
        default:
            return state;
    }
};