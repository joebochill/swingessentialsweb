import { Status } from '../../../__types__';
import { CREATE_ACCOUNT } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const CreateAccountReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case CREATE_ACCOUNT.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };

        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case CREATE_ACCOUNT.FAILURE: {
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: null,
                extra: null,
            };
        }
        default:
            return state;
    }
};
