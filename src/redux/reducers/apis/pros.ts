import { Status } from '../../../__types__';
import { GET_PROS } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const ProsReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case GET_PROS.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };
        case GET_PROS.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case GET_PROS.FAILURE:
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
