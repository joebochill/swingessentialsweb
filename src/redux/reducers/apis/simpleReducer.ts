import { BasicAPIStatus } from '../../../__types__';
import { ReduxAction } from '../../actions/utilities';

const initialState: BasicAPIStatus = {
    status: 'initial',
    code: null,
};
export const simpleReducer = (ACTION: ReduxAction) => (state = initialState, action: any): BasicAPIStatus => {
    switch (action.type) {
        case ACTION.REQUEST:
            return {
                ...state,
                status: 'loading',
                code: null,
            };

        case ACTION.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
            };

        case ACTION.FAILURE: {
            const errorCode = parseInt(action.error, 10);
            return {
                ...state,
                status: 'failed',
                code: isNaN(errorCode) ? -1 : errorCode,
            };
        }
        case ACTION.RESET: {
            return initialState;
        }
        default:
            return state;
    }
};
