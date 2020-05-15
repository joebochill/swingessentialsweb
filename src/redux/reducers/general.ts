import { GeneralState } from '../../__types__';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/types';

const initialAppState: GeneralState = {
    drawerOpen: false,
};
export const GeneralReducer = (state = initialAppState, action: any): GeneralState => {
    switch (action.type) {
        case OPEN_DRAWER:
            return {
                ...state,
                drawerOpen: true,
            };
        case CLOSE_DRAWER:
            return {
                ...state,
                drawerOpen: false,
            };
        default:
            return state;
    }
};
