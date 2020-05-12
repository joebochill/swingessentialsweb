import { GET_DISCOUNTS } from '../../actions/types';
import { DiscountsState } from '../../../__types__';

const initialState: DiscountsState = {
    list: [],
};
export const DiscountsReducer = (state = initialState, action: any): DiscountsState => {
    switch (action.type) {
        case GET_DISCOUNTS.SUCCESS:
            return {
                list: action.payload,
            };
        default:
            return state;
    }
};
