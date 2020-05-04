import { Status } from '../../../__types__';
import { LOGOUT, TOKEN_TIMEOUT, REDEEM_LESSON } from '../../actions/types';

const initialAppState: Status = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};

export const RedeemLessonsReducer = (state = initialAppState, action: any): Status => {
    switch (action.type) {
        case REDEEM_LESSON.REQUEST:
            return {
                ...state,
                requestStatus: 'loading',
                message: '',
                code: null,
                extra: null,
            };
        case REDEEM_LESSON.SUCCESS:
            return {
                ...state,
                requestStatus: 'success',
                message: '',
                code: null,
                extra: null,
            };
        case REDEEM_LESSON.FAILURE:
            return {
                ...state,
                requestStatus: 'failed',
                message: '',
                code: parseInt(action.error, 10),
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
