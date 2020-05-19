import { DiscountStatus } from '../../../__types__';
import { CHECK_DISCOUNT } from '../../actions/types';

const initialState: DiscountStatus = {
    status: 'initial',
    code: null,
    data: null,
};
export const CheckDiscountReducer = (state = initialState, action: any): DiscountStatus => {
    switch (action.type) {
        case CHECK_DISCOUNT.REQUEST:
            return {
                ...state,
                status: 'loading',
                code: null,
            };

        case CHECK_DISCOUNT.SUCCESS:
            return {
                ...state,
                status: 'success',
                code: null,
                data: {
                    code: action.payload.code,
                    type: action.payload.type,
                    value: action.payload.value,
                },
            };
        case CHECK_DISCOUNT.FAILURE: {
            return {
                ...state,
                status: 'failed',
                code: null,
            };
        }
        case CHECK_DISCOUNT.RESET: {
            return initialState;
        }
        default:
            return state;
    }
};
