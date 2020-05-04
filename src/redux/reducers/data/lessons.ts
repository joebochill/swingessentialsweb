import { GET_LESSONS, LOGOUT, TOKEN_TIMEOUT, SET_SELECTED_LESSON } from '../../actions/types';
import { LessonsState } from '../../../__types__';

const initialState: LessonsState = {
    pending: [],
    closed: [],
    selected: null,
};

export const LessonsReducer = (state = initialState, action: any): LessonsState => {
    switch (action.type) {
        case GET_LESSONS.SUCCESS:
            return {
                ...state,
                pending: action.payload.pending,
                closed: action.payload.closed,
            };
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT:
            return {
                ...state,
                pending: [],
                closed: [],
            };
        case SET_SELECTED_LESSON:
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;
    }
};
