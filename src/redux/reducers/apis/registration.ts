import { BasicAPICheckStatus } from '../../../__types__';
import { CHECK_EMAIL, CHECK_USERNAME } from '../../actions/types';

const initialState: BasicAPICheckStatus = {
    status: 'initial',
    code: null,
    data: {
        available: false,
    },
};
export const CheckEmailReducer = (state = initialState, action: any): BasicAPICheckStatus => {
    switch (action.type) {
        case CHECK_EMAIL.REQUEST:
            return {
                ...state,
                status: 'loading',
                code: null,
                data: {
                    available: false,
                },
            };

        case CHECK_EMAIL.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    available: action.payload.available,
                },
            };
        case CHECK_EMAIL.FAILURE: {
            return {
                ...state,
                status: 'failed',
                code: null,
                data: {
                    available: false,
                },
            };
        }
        case CHECK_EMAIL.RESET:
            return initialState;
        default:
            return state;
    }
};

export const CheckUsernameReducer = (state = initialState, action: any): BasicAPICheckStatus => {
    switch (action.type) {
        case CHECK_USERNAME.REQUEST:
            return {
                ...state,
                status: 'loading',
                code: null,
                data: {
                    available: false,
                },
            };

        case CHECK_USERNAME.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    available: action.payload.available,
                },
            };
        case CHECK_USERNAME.FAILURE: {
            return {
                ...state,
                status: 'failed',
                code: null,
                data: {
                    available: false,
                },
            };
        }
        case CHECK_USERNAME.RESET:
            return initialState;
        default:
            return state;
    }
};
