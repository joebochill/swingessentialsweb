import { combineReducers } from 'redux';
// import { CHANGE_PAGE_TITLE, CHANGE_COLOR_FORMAT, TOGGLE_DRAWER } from '../actions';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';
// import { AppActions } from '../actions/actionTypes';

export type AppState = {
    app: CommonState;
};
type CommonState = {
    drawerOpen: boolean;
};
const initialAppState: CommonState = {
    drawerOpen: false,
};
const appReducer = (state = initialAppState, action: any): CommonState => {
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
export const rootReducer = (): any =>
    combineReducers<AppState>({
        app: appReducer,
    });
