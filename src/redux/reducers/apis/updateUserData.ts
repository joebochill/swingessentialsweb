import { Status } from '../../../__types__';
import { SET_USER_DATA, RESET_API_STATUS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const UpdateUserDataReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case SET_USER_DATA.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case SET_USER_DATA.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case SET_USER_DATA.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        }
        case RESET_API_STATUS.USER_DATA:
            return {
                ...state,
                requestStatus: 'initial',
                message: '',
                code: null,
                extra: null,
            };
        default:
            return state;
    }
};
