import { Status } from '../../../__types__';
import { GET_USER_DATA } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const GetUserDataReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case GET_USER_DATA.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case GET_USER_DATA.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case GET_USER_DATA.FAILURE:
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        default:
            return state;
    }
};
