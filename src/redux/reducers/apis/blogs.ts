import { Status } from '../../../__types__';
import { LOGOUT, TOKEN_TIMEOUT, GET_BLOGS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const BlogsReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case GET_BLOGS.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case GET_BLOGS.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case GET_BLOGS.FAILURE:
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
