import { Status } from '../../../__types__';
import { GET_LESSONS, LOGOUT, TOKEN_TIMEOUT } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const LoadLessonsReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case GET_LESSONS.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };
        case GET_LESSONS.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case GET_LESSONS.FAILURE:
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT:
            return initialAppState;
        default:
            return state;
    }
};
