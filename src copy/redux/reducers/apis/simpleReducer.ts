import { BasicAPIStatus } from '../../../__types__';
import { ReduxAction } from '../../actions/utilities';

const initialState: BasicAPIStatus = {
    status: 'initial',
    code: null,
};
export const simpleReducer =
    (reduxAction: ReduxAction) =>
    (state = initialState, action: any): BasicAPIStatus => {
        switch (action.type) {
            case reduxAction.REQUEST:
                return {
                    ...state,
                    status: 'loading',
                    code: null,
                };

            case reduxAction.SUCCESS:
                return {
                    ...state,
                    status: 'success',
                    code: null,
                };

            case reduxAction.FAILURE: {
                const errorCode = parseInt(action.error, 10);
                return {
                    ...state,
                    status: 'failed',
                    code: isNaN(errorCode) ? -1 : errorCode,
                };
            }
            case reduxAction.RESET: {
                return initialState;
            }
            default:
                return state;
        }
    };
